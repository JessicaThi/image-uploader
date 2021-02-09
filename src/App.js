import './App.css';
import imageUpload from './img/image.svg'
//import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';
import DropzoneWithoutDrag from './components/DropzoneWithoutDrag'


function App() {
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({noClick: true});
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  return (
    <div className="App">
      <div className="content-upload">
        <h1>Upload your image</h1>
        <p className="text-3">Files should be Jpeg, Png,...</p>
          <div {...getRootProps({className: 'dropzone-area'})}>
            <input {...getInputProps()} />
            <img src={imageUpload} alt="icon for upload" />
            <p className="text-4">Drag & Drop your image here</p>
          </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        <p className="text-4">Or</p>
        {/* <button className="btn">Choose a file</button> */}
        <DropzoneWithoutDrag />
      </div>
    </div>
  );
}

export default App;