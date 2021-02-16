import { React, useState, useEffect} from 'react'
import Lottie from 'react-lottie'
import animationData from './../lotties/validation'


export default function Uploaded({files, API_URL}) {
    const [setTextToCopy] = useState(null);

    const thumbs = files.map(file => (
        <img
            src={file.preview}
            key={file.name}
            alt={file.name}
        />
    ));

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    return (
        <div className="content-uploaded">
            <Lottie 
                options={defaultOptions}
                height={50}
                width={50}
            />
            <h1>Successfully uploaded !</h1>
            { thumbs }
            { files.length ? 
                <div className="content-link">
                    <input type="text" value={`${API_URL}/${files[0].path}`}  /> 
                    <button className="btn" onClick={() => {setTextToCopy(navigator.clipboard.writeText(`${API_URL}/${files[0].path}`))}}>Copy link</button>
                </div>
            : "" } 
        </div>
    )
}
