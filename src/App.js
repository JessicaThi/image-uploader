import './App.css';
import imageUpload from './img/image.svg'

function App() {
  return (
    <div className="App">
      <div className="content-upload">
        <h1>Upload your image</h1>
        <p className="text-3">Files should be Jpeg, Png,...</p>
        <div className="content-image">
          <img src={imageUpload} alt="icon for upload" />
          <p className="text-4">Drag & Drop your image here</p>
        </div>
        <p className="text-4">Or</p>
        <button className="btn">Choose a file</button>
      </div>
    </div>
  );
}

export default App;
