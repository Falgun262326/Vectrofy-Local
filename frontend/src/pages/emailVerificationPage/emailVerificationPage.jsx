import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../Store/Store";
import toast from "react-hot-toast";
import './emailVerificationPage.css';
import path4 from "../../assets/illustrations/path4.png";
import path1 from "../../assets/illustrations/path1.png";
import path2 from "../../assets/illustrations/path2.png";
import path3 from "../../assets/illustrations/path3.png";
import path5 from "../../assets/illustrations/path5.png";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { error, isLoading, verifyEmail } = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
        }
    };

    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <div className='emailVerificationBackground signUpBackground'>
            <img src={path1} className="path1" alt="designIcon" />
            <img src={path2} className="path2" alt="designIcon" />
            <img src={path3} className="path3" alt="designIcon" />
            <img src={path5} className="path5" alt="designIcon" />
            <div className="emailVerificationPage">
                <div className="emailVerificationPageContainer">
                    <img src={path4} className="path4Form1" alt="designIcon" />
                    <img src={path4} className="path4Form2" alt="designIcon" />
                    <form onSubmit={handleSubmit}>
                        <h2>Email Verification</h2>
                        <div className="codeInputBoxes">
                            {code.map((digit, index) => (
                                <div className="inputBoxEmailCode" key={index}>
                                    <input
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        name={`code${index}`}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        maxLength={1}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        {error && <p className="errorMessage">{error}</p>}

                        <button
                            type="submit"
                            className="submitBtn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify Email"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
