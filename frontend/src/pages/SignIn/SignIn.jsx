import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import path4 from "../../assets/illustrations/path4.png";
import path1 from "../../assets/illustrations/path1.png";
import path2 from "../../assets/illustrations/path2.png";
import path3 from "../../assets/illustrations/path3.png";
import path5 from "../../assets/illustrations/path5.png";
import { Loader } from "lucide-react";
import { useAuthStore } from '../../Store/Store';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    const { login, error, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
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

            <div className="signUp">
                <div className="signUpContainer">
                    <img src={path4} className="path4Form1" alt="designIcon" />
                    <img src={path4} className="path4Form2" alt="designIcon" />

                    <form onSubmit={handleSubmit}>
                        <h2>Log In</h2>

                        <div className="inputBox firstInputBox">
                            <input
                                type="text"
                                name="email"
                                required="required"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <span className="inputBoxSpan">email</span>
                        </div>

                        <div className="inputBox thirdInputBox">
                            <input
                                type="password"
                                name="password"
                                required="required"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <span className="inputBoxSpan">Password</span>
                        </div>

                        {error && <p className="errorMessage">{error}</p>}

                        <div className="formLinks">
                            <Link to="/forgot-password">Forgot Password?</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>

                        <button
                            type="submit"
                            className="submitBtn"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
