import React, { useState, useEffect } from 'react';
import LivePreview from '../../components/livePreview/LivePreview';
import './PreviewContainer.css';
import RangeBar from '../RangeBar/RangeBar';
import { useDispatch, useSelector } from 'react-redux';
import { setImages, setClickedImage } from '../../Slice/imageSlice';
import path4 from '../../assets/illustrations/path4.png';
import path7 from '../../assets/illustrations/path7.png';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import axios from 'axios';

let userId = sessionStorage.getItem("id");

const PreviewContainer = () => {
    const dispatch = useDispatch();
    const clickedImage = useSelector((state) => state.images.clickedImage);
    const clickedImageId = useSelector((state) => state.images.clickedImageId);
    const clickedImageRange = useSelector((state) => state.images.clickedImageRange);
    const [image, setImage] = useState("");
    const [threshold, setThreshold] = useState(128);

    useEffect(() => {
        if (clickedImage) {
            setImage(clickedImage);
            setThreshold(clickedImageRange);
            console.log(clickedImageRange);
            console.log(threshold);
            console.log(clickedImageId);
        }
    }, [clickedImage, clickedImageRange]);

    const convertFile = (e) => {
        try {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                console.log(reader.result);
                setImage(reader.result)
            }
            reader.onerror = (error) => {
                console.log('error', error);
            }
        } catch (error) {
            console.log("upload file canceled");

        }

    }

    const uploadImage = () => {
        document.getElementById('fileInput').click();
        handleThresholdChange(125)
    };

    const handleThresholdChange = (value) => {
        setTimeout(() => {
            setThreshold(value);
        }, 300);
    };

    const downloadImage = async () => {

        const formData = new FormData();

        console.log("Threshold value before fetch:", threshold);

        if (clickedImage) {

            console.log("clickedImageId:", clickedImageId);

            await axios.put(`http://localhost:5000/api/v2/update-image-range/${clickedImageId}`, {
                rangeVal: threshold // Correct structure for the body
            })
                .then((res) => {
                    console.log("Response status:", res.status); // Remove the `ok` check for Axios
                    return res.data; // Axios responses have data property
                })
                .then((data) => console.log("Response data:", data))
                .catch((error) => console.error("Fetch error:", error));



            const base64Index = clickedImage.indexOf(',') + 1;
            const base64Data = base64Index ? clickedImage.substring(base64Index) : clickedImage;

            const binaryString = atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([bytes], { type: 'image/png' });

            formData.append('file', blob, 'clickedImage.png');
            dispatch(setClickedImage(""))



        } else {
            fetch("http://localhost:5000/api/v2/upload-image", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    base64: image,
                    rangeVal: threshold,
                    id: userId,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error:', error));
        }

        formData.append('file', document.querySelector('#fileInput').files[0]);
        formData.append('threshold', threshold);

        fetch("http://127.0.0.1:8080/convert", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const blob = new Blob([data.svg], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = 'vectrofy.svg';  // Updated file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                URL.revokeObjectURL(url);  // Clean up URL to release memory
            })
            .catch(error => {
                console.error('Error:', error);
            });

        setImage("")
        setTimeout(() => {
            getImage();
        }, 300);
    }

    const getImage = () => {
        const userId = sessionStorage.getItem("id"); // Retrieve the user ID from session storage
        fetch(`http://localhost:5000/api/v2/get-image?id=${userId}`, { // Pass the user ID in the query string
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                if (data.images && Array.isArray(data.images)) {
                    dispatch(setImages(data.images));
                } else {
                    console.error('Invalid data format', data);
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    getImage()

    return (
        <div className="previewContainer">

            <div className="previewContainerProportion_1">
                <img src={path4} className='path4' alt='designIcon' />
            </div>
            <div className="previewContainerProportion_2">
                <img src={path7} className='path7' alt='designIcon' />
            </div>

            <div className="rangeBar">
                <RangeBar className='slider1' color={'red'} onChange={handleThresholdChange} value={threshold} />
            </div>

            useEffect(() => {
                <LivePreview image={image} />
            }, [image,uploadImage,clickedImage])


            {/* Hidden file input */}
            <form>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    // onChange={handleFileChange}
                    onChange={convertFile}
                    name='fileInput'
                    accept="image/png, image/jpeg"
                />
            </form>

            {/* Upload Button */}
            <button
                className='uploadButton actionBtn'
                type='button'
                onClick={uploadImage}
            >
                {/* {selectedFile && console.log(selectedFile.name)} */}

                <div className="uploadButtonContainer">
                    <AiOutlineCloudUpload />
                </div>
            </button>

            {/* Download Button */}
            <button className='downloadButton actionBtn' onClick={downloadImage}>
                <div className="downloadButtonContainer">
                    <LuDownload />
                </div>
            </button>

        </div>
    );
};

export default PreviewContainer;

