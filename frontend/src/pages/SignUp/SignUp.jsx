import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../../components/passwordStrengthMeter/passwordStrengthMeter';
import { useAuthStore } from '../../Store/Store';
import './SignUp.css';
import path4 from '../../assets/illustrations/path4.png';
import path1 from '../../assets/illustrations/path1.png';
import path2 from '../../assets/illustrations/path2.png';
import path3 from '../../assets/illustrations/path3.png';
import path5 from '../../assets/illustrations/path5.png';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate('/verify-email');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signUpBackground">
            <img src={path1} className="path1" alt="designIcon" />
            <img src={path2} className="path2" alt="designIcon" />
            <img src={path3} className="path3" alt="designIcon" />
            <img src={path5} className="path5" alt="designIcon" />
            <div className="signUp signUpNew">
                <div className="signUpContainer signUpContainerNew">
                    <img src={path4} className="path4Form1" alt="designIcon" />
                    <img src={path4} className="path4Form2" alt="designIcon" />
                    <form onSubmit={handleSignUp}>
                        <h2> Sign Up</h2>
                        <div className="inputBox inputBoxNew">
                            <input
                                type="text"
                                name="name"
                                required="required"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span className="inputBoxSpan">Full Name</span>
                        </div>
                        <div className="inputBox inputBoxNew">
                            <input
                                type="email"
                                name="email"
                                required="required"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="inputBoxSpan">Email</span>
                        </div>
                        <div className="inputBox inputBoxNew">
                            <input
                                type="password"
                                name="password"
                                required="required"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="inputBoxSpan">Password</span>
                        </div>

                        <PasswordStrengthMeter password={password} />
                        {error && <p className="text-red-500">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="submitBtn"
                        >
                            {isLoading ? <span className="loader" /> : 'Sign Up'}
                        </button>
                        <div className="formLinks">
                            <p>Already a member?</p>
                            <Link to="/signin" className="formLink">
                                Log In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
