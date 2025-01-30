import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../Store/Store";
import { useNavigate, useParams } from "react-router-dom";
// import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading, message } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const [Inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="reset-password-container"
        >
            <div className="form-container">
                <h2 className="form-title">Reset Password</h2>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}

                <form onSubmit={handleSubmit}>
                    {/* <Input
                        icon={Lock}
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    /> */}

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

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="submit-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Set New Password"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};
export default ResetPasswordPage;
