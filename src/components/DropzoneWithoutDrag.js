import {useDropzone} from 'react-dropzone';

function DropzoneWithoutDrag(props) {
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({noDrag: true});
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  return (
    <button {...getRootProps({className: 'btn'})}>
        <input {...getInputProps()} />
        <p>Choose a file</p>
    </button>
  );
}

export default DropzoneWithoutDrag;