import Lottie from "react-lottie";
import animationData from "./../lotties/validation";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Uploaded({ files, imageUrl }) {
  const thumbs = files.map((file) => (
    <img src={imageUrl} key={file.name} alt={file.name} />
  ));

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="content-uploaded">
      <Lottie options={defaultOptions} height={50} width={50} />
      <h1>Successfully uploaded !</h1>
      {thumbs}
      {files.length ? (
        <div className="content-link">
          <input type="text" value={imageUrl} />
          <CopyToClipboard text={imageUrl}>
            <button className="btn">Copy link</button>
          </CopyToClipboard>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
