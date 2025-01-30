import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      {/* Simple Loading Spinner */}
      <motion.div
        className="loadingSpinnerDiv"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
