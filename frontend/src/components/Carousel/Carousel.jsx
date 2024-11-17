import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Carousel.css';
import UploadedImage from '../uploadedImage/UploadedImage';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import path6 from '../../assets/illustrations/path6.png';

const Carousel = ({ onImageClick }) => {
    const allImages = useSelector((state) => state.images.allImages || []);
    const [startIndex, setStartIndex] = useState(0);

    const imageWidth = 165;
    const scrollAmount = 2;

    const scrollRight = () => {
        if (startIndex + scrollAmount < allImages.length) {
            setStartIndex(prevIndex => prevIndex + scrollAmount);
        }
    };

    const scrollLeft = () => {
        if (startIndex - scrollAmount >= 0) {
            setStartIndex(prevIndex => prevIndex - scrollAmount);
        }
    };

    return (
        <div className="carouselWrapper">
            <div className="carouselContainer">
                <img src={path6} className='path6' alt='designIcon' />
                <img src={path6} className='path6-2' alt='designIcon' />
                <div
                    className="carouselTrack"
                    style={{
                        transform: `translateX(-${startIndex * imageWidth}px)`,
                        transition: 'transform 0.5s ease-in-out'
                    }}
                >
                    {allImages.length > 0 ? allImages.map((image, index) => (
                        <UploadedImage
                            key={image._id}
                            imageId={image._id}
                            image={image.image}
                            onImageDeleted={() => { }}

                            onClick={() => onImageClick(image.image)} />
                    )) : (
                        <p className='emptyCarouselText'>Upload Your First Image</p>
                    )}

                </div>
            </div>
            <div className="btnGroup">
                <button
                    className="scrollButton nextButton"
                    onClick={scrollRight}
                >
                    <div className="buttonContainer">
                        <MdOutlineNavigateNext />
                    </div>
                </button>
                <button
                    className="scrollButton prevButton"
                    onClick={scrollLeft}
                    disabled={startIndex === 0}
                >
                    <div className="buttonContainer">
                        <GrFormPrevious />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
