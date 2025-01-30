import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../Store/Store";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import './forgotPassword.css'
import path4 from '../../assets/illustrations/path4.png';
import path1 from '../../assets/illustrations/path1.png';
import path2 from '../../assets/illustrations/path2.png';
import path3 from '../../assets/illustrations/path3.png';
import path5 from '../../assets/illustrations/path5.png';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isLoading, forgotPassword } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    };

    return (
        // <motion.div
        //     initial={{ opacity: 0, y: 20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     transition={{ duration: 0.5 }}
        //     className="forgot-password-container"
        // >
        //     <div className="form-container">
        //         <h2 className="form-title">Forgot Password</h2>

        //         {!isSubmitted ? (
        //             <form onSubmit={handleSubmit}>
        //                 <p className="form-description">
        //                     Enter your email address and we'll send you a link to reset your password.
        //                 </p>
        //                 {/* <Input
        //                     icon={Mail}
        //                     type="email"
        //                     placeholder="Email Address"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     required
        //                 /> */}

        //                 <input
        //                     type="text"
        //                     name='username'
        //                     required='required'
        //                     onChange={change}
        //                     value={Inputs.username} />

        //                 <span className="inputBoxSpan">Username</span>

        //                 <motion.button
        //                     whileHover={{ scale: 1.02 }}
        //                     whileTap={{ scale: 0.98 }}
        //                     className="submit-button"
        //                     type="submit"
        //                 >
        //                     {isLoading ? <Loader className="loader" /> : "Send Reset Link"}
        //                 </motion.button>
        //             </form>
        //         ) : (
        //             <div className="confirmation-message">
        //                 <motion.div
        //                     initial={{ scale: 0 }}
        //                     animate={{ scale: 1 }}
        //                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
        //                     className="confirmation-icon"
        //                 >
        //                     <Mail className="icon" />
        //                 </motion.div>
        //                 <p className="confirmation-text">
        //                     If an account exists for {email}, you will receive a password reset link shortly.
        //                 </p>
        //             </div>
        //         )}
        //     </div>

        //     <div className="back-to-login">
        //         <Link to={"/login"} className="back-link">
        //             <ArrowLeft className="arrow-icon" /> Back to Login
        //         </Link>
        //     </div>
        // </motion.div>
        <>
            <div className="signUpBackground">
                <img src={path1} className="path1" alt="designIcon" />
                <img src={path2} className="path2" alt="designIcon" />
                <img src={path3} className="path3" alt="designIcon" />
                <img src={path5} className="path5" alt="designIcon" />
                <div className="emailVerificationPage ">
                    <div className="signUpContainer signUpContainerNew">
                        <img src={path4} className="path4Form1" alt="designIcon" />
                        <img src={path4} className="path4Form2" alt="designIcon" />
                        <h2> Forgot Password</h2>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <p>Enter your email address and we'll send you a link to reset your password.</p>
                                <div className="inputBox inputBoxNew">
                                    <input
                                        type="text"
                                        name="name"
                                        required="required"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="inputBoxSpan">email</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="submitBtn"
                                >
                                    {isLoading ? <span className="loader" /> : 'Send Reset Link'}
                                </button>
                            </form>
                        )
                            :
                            (
                                <div className="confirmation-message">
                                    <Mail className="icon" />
                                    <p className="confirmation-text">
                                        If an account exists for {email}, you will receive a password reset link shortly.
                                    </p>
                                </div>
                            )}

                    </div>
                </div>
            </div>

        </>
    );
};
export default ForgotPasswordPage;
