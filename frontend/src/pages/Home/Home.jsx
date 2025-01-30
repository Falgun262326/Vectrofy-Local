import React from 'react'
import './Home.css'
import path1 from '../../assets/illustrations/path1.png';
import path2 from '../../assets/illustrations/path2.png';
import path3 from '../../assets/illustrations/path3.png';
import path5 from '../../assets/illustrations/path5.png';
import Carousel from '../../components/Carousel/Carousel';
import Navbar from '../../components/Navbar/Navbar';
import PreviewContainer from '../../components/previewContainer/PreviewContainer';

const Home = () => {

    return (
        <div className='windowBackground'>
            <Navbar />
            <img src={path1} className='path1' alt='designIcon' />
            <img src={path2} className='path2' alt='designIcon' />
            <img src={path3} className='path3' alt='designIcon' />
            <img src={path5} className='path5' alt='designIcon' />
            <div className='homeContainer'>
                <div className="carousel">
                    <Carousel />
                </div>
                <PreviewContainer />
            </div>
        </div>
    )
}

export default Home
