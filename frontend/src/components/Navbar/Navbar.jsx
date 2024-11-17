import React from 'react'
import './Navbar.css'
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const history = useNavigate();

    const logOut = () => {
        sessionStorage.clear("id");
        history("/signin");
    }

    return (
        <div className='navContainer'>
            <div className="logo">Vectrofy</div>
            <div className="logOutBtn" onClick={logOut}><MdOutlineLogout /></div>
        </div>
    )
}

export default Navbar
