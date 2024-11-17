import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import path4 from '../../assets/illustrations/path4.png';
import path1 from '../../assets/illustrations/path1.png';
import path2 from '../../assets/illustrations/path2.png';
import path3 from '../../assets/illustrations/path3.png';
import path5 from '../../assets/illustrations/path5.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const history = useNavigate();
    const [Inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/signin`, Inputs);
            setInputs({
                username: "",
                password: "",
            });
            console.log(response.data);
            sessionStorage.setItem("id", response.data.user._id);

            history("/");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("User already exists. Please use a different email.");
            } else if (error.response) {
                alert(error.response.data.message);
            }
            console.error(error);  // Log the full error for debugging
        }
    };


    return (
        <div className='signUpBackground'>
            <img src={path1} className='path1' alt='designIcon' />
            <img src={path2} className='path2' alt='designIcon' />
            <img src={path3} className='path3' alt='designIcon' />
            <img src={path5} className='path5' alt='designIcon' />
            <div className="signUp">
                <div className="signUpContainer">
                    <img src={path4} className='path4Form1' alt='designIcon' />
                    <img src={path4} className='path4Form2' alt='designIcon' />
                    <form>

                        <h2>Log In</h2>
                        <div className="inputBox firstInputBox">
                            <input
                                type="text"
                                name='username'
                                required='required'
                                onChange={change}
                                value={Inputs.username} />

                            <span className="inputBoxSpan">Username</span>
                        </div>

                        <div className="inputBox thirdInputBox">
                            <input
                                type="password"
                                name='password'
                                required='required'
                                onChange={change}
                                value={Inputs.password} />

                            <span className="inputBoxSpan">Password</span>

                        </div>

                        <div className="formLinksSignIn">
                            <Link to="/signup">Sign Up</Link>
                        </div>

                        <input type="submit" value={'Log In'} className='submitBtn' onClick={submit} />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
