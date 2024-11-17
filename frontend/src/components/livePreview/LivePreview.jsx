import React from 'react'
import './LivePreview.css'

const LivePreview = (props) => {

    return (
        <>
            {props.image === '' || props.image === null ? <div className="livePreview">
            </div> :
                <div className="livePreviewImageContainer" >
                    <img src={props.image} className='livePreviewImage' alt='selected image' />
                </div>}
        </>
    )
}

export default LivePreview
