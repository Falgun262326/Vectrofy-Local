import React from 'react';
import './UploadedImage.css';
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteImage, fetchImages, setClickedImage, setClickedImageRange, setClickedImageId } from '../../Slice/imageSlice';  // Import actions

const UploadedImage = (props) => {

    const dispatch = useDispatch();

    const handleEditClick = () => {
        fetch(`http://localhost:5000/api/v2/get-edit-image/${props.imageId}`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                dispatch(setClickedImage(data.editImage));
                dispatch(setClickedImageRange(data.rangeVal));
                dispatch(setClickedImageId(props.imageId));
            })
            .catch((error) => console.error('Error:', error));
    };

    const deleteImageHandler = () => {
        fetch(`http://localhost:5000/api/v2/delete-image/${props.imageId}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Dispatch the action to remove the image from Redux state
                dispatch(deleteImage(props.imageId));

                // Dispatch fetchImages action to reload the images from the server
                const userId = sessionStorage.getItem("id");  // Retrieve user ID from session storage
                dispatch(fetchImages(userId));  // Trigger fetching of updated images
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="imageCard">
            <div className="imageRoundedContainer" onClick={handleEditClick}>
                <img src={props.image} alt='uploaded images' className='imageCardImage' />
                <div className="imageOptions">
                    <button className="editImageButton" onClick={handleEditClick}><FiEdit2 /></button>
                    <button className="deleteImageButton" onClick={deleteImageHandler}>
                        <MdOutlineDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadedImage;
