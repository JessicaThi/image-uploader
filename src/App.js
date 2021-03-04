import "./App.css";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Upload from "./components/Upload";
import Uploading from "./components/Uploading";
import Uploaded from "./components/Uploaded";

function App() {
  const [files, setFiles] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [status, setStatus] = useState("upload");
  const [imageUrl, setImageUrl] = useState(null);

  const { acceptedFiles, open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      uploadFile(acceptedFiles);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (uploadPercentage === 100) {
      setStatus("uploaded");
      setTimeout(() => {
        setUploadPercentage(0);
      }, 1000);
    }
  }, [uploadPercentage]);

  const uploadFile = (acceptedFiles) => {
    setStatus("uploading");

    let data = new FormData();
    data.append("file", acceptedFiles[0]);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kf of ${total}kb | ${percent}% `);

        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };

    axios
      .post(`${process.env.API_URL}/api/files`, data, options)
      .then((res) => {
        setUploadPercentage(100);
        setImageUrl(res.data.fileLocation);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div className="App">
      <div className="content-upload">
        {status === "upload" ? (
          <Upload
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            open={open}
          />
        ) : (
          ""
        )}
        {status === "uploading" ? (
          <Uploading uploadPercentage={uploadPercentage} />
        ) : (
          ""
        )}
        {status === "uploaded" ? (
          <Uploaded files={files} imageUrl={imageUrl} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
