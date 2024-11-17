const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Trim inputs
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Check if the user already exists by email or username
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

    // Create new user
    const user = new User({
      email: trimmedEmail,
      username: trimmedUsername,
      password: hashedPassword, // Password will be hashed in user model pre-save hook
    });

    await user.save();
    res.status(200).json({ message: "Sign Up Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Trim inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Check if the user exists
    const user = await User.findOne({ username: trimmedUsername });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please Sign Up First" });
    }

    // Compare password using the method in the user model
    const isPasswordCorrect = await user.comparePassword(trimmedPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    // Remove password from user object before returning it
    const { password: _, ...others } = user._doc;

    res.status(200).json({ user: others });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// FORGOT PASSWORD
router.put("/forgot-password", async (req, res) => {
  try {
    const { username, password, reEnterPassword } = req.body;

    // Trim inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedReEnterPassword = reEnterPassword.trim();

    // Find user by username
    const existingUser = await User.findOne({
      username: trimmedUsername,
    }).populate("uploadedImages");
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Check if passwords match
    if (trimmedPassword !== trimmedReEnterPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Manually hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

    // Update the user's password with the new hashed password
    existingUser.password = hashedPassword;

    // Save the updated user
    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
