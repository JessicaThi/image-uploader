import { React, useState, useEffect} from 'react'


export default function Ulpoaded({files, API_URL}) {
    const [setTextToCopy] = useState(null);

    const thumbs = files.map(file => (
        <img
            src={file.preview}
            key={file.name}
            alt={file.name}
        />
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    return (
        <div>
            { files.length ? <input type="text" value={`${API_URL}/${files[0].path}`} onClick={() => {setTextToCopy(navigator.clipboard.writeText(`${API_URL}/${files[0].path}`))}} /> : "" } 
            { thumbs }
        </div>
    )
}
