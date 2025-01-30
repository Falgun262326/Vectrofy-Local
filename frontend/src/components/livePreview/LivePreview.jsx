import React from 'react'
import './LivePreview.css'

const LivePreview = (props) => {

    return (
        <>
            {props.image &&
                <div className='livePreview'>
                    <div className="livePreviewImageContainer" >
                        <img src={props.image} className='livePreviewImage' alt='selected' aly />
                    </div>
                </div>
            }
        </>
    )
}

export default LivePreview
