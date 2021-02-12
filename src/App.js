import './App.css';
import { useState, useEffect } from "react"
import placeholderImage from './img/image.svg'
//import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';
import DropzoneWithoutDrag from './components/DropzoneWithoutDrag';
import axios from 'axios';


function App() {
  const [files, setFiles] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const { acceptedFiles, getRootProps, getInputProps} = useDropzone({
    noClick: true,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      uploadFile(acceptedFiles)
    }
  }, [acceptedFiles])

  const thumbs = files.map(file => (
    <img
      src={file.preview}
      key={file.name}
      alt={file.name}
    />
  ));

  const uploadFile = (acceptedFiles) => {
    console.log( acceptedFiles[0]);
    let data = new FormData();
    data.append( 'file', acceptedFiles[0])

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total} = progressEvent;
        let percent = Math.floor( ( loaded * 100 ) / total ) 
        console.log( `${loaded}kf of ${total}kb | ${percent}% `)

        if( percent < 100 ) {
          setUploadPercentage(percent);
        }
      }
    }

    axios.post('http://localhost:3200/api/files', data, options)
    .then((res) => {
      this.setState({uploadPercentage: 100}, () => {
        setTimeout(() => {
          setUploadPercentage(0);
        }, 1000)
      })
    })
    .catch(error => console.error(`Error: ${error}`));
  }

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="App">
      <div className="content-upload">
        <h1>Upload your image</h1>
        { uploadPercentage > 0 ?  <progress id="file" max="100" value={uploadPercentage}>{uploadPercentage}</progress> : "" }
        <p className="text-3">Files should be Jpeg, Png,...</p>
          <div {...getRootProps({className: 'dropzone-area'})}>
            <input {...getInputProps()} />
            <img src={placeholderImage} alt="icon for upload" />
            <p className="text-4">Drag & Drop your image here</p>
          </div>
        <aside>
          { uploadPercentage > 0 ?  <progress id="file" max="100" value={uploadPercentage}>{uploadPercentage}</progress> : "" }
          { thumbs }
        </aside>
        <p className="text-4">Or</p>
        {/* <button className="btn">Choose a file</button> */}
        <DropzoneWithoutDrag />
      </div>
    </div>
  );
}

export default App;