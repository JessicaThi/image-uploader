import React from 'react'
import placeholderImage from './../img/image.svg'

export default function Upload({getRootProps, getInputProps, open}) {
    return (
        <div>
            <h1>Upload your image</h1>
            <p className="text-3">Files should be Jpeg, Png,...</p>
            <div {...getRootProps({className: 'dropzone-area'})}>
                <input {...getInputProps()} />
                <img src={placeholderImage} alt="icon for upload" />
                <p className="text-4">Drag & Drop your image here</p>
            </div>
            <p className="text-4">Or</p>
            <button className="btn" type="button" onClick={open}>
                Choose a file
            </button>
        </div>
    )
}
