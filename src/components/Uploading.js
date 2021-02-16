import React from 'react'

export default function Uploading({uploadPercentage}) {
    return (
        <div className="content-uploading">
            <h1>Uploading...</h1>
            { uploadPercentage > 0 ?  <progress id="file" max="100" value={uploadPercentage}>{uploadPercentage}</progress> : "" }
        </div>
    )
}
