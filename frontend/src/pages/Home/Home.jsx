import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import path1 from '../../assets/illustrations/path1.png';
import path2 from '../../assets/illustrations/path2.png';
import path3 from '../../assets/illustrations/path3.png';
import path5 from '../../assets/illustrations/path5.png';
import Carousel from '../../components/Carousel/Carousel';
import Navbar from '../../components/Navbar/Navbar';
import PreviewContainer from '../../components/previewContainer/PreviewContainer';



const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('id');
        if (!userId) {
            navigate('/signin');  // Redirect to login if no user ID is found
        }
    }, [navigate]);
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
