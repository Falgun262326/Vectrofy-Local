import nodemailer from "nodemailer";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTempelates.js";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.EMAIL_FROM || !process.env.EMAIL_FROM_PASSWORD) {
  throw new Error("Email credentials are missing in environment variables.");
}

// Create transporter for Gmail
export const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_FROM, // Replace with your Gmail address
    pass: process.env.EMAIL_FROM_PASSWORD, // Replace with your App Password
  },
});

// Function to send generic emails
export const sendMail = async (to, subject, msg) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender's email
      to: to, // Recipient email
      subject: subject, // Email subject
      html: msg, // Email content in HTML format
    });

    console.log("Mail sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Function to send verification emails
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const emailContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

    const response = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender's email
      to: email, // Recipient email
      subject: "Verify Your Email", // Email subject
      html: emailContent, // Email content
    });

    console.log("Verification email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const emailContent = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);

    const response = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender's email
      to: email, // Recipient email
      subject: "Verification successful", // Email subject
      html: emailContent, // Email content
    });

    console.log("Welcome email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending Welcome email:", error.message);
    throw new Error(`Error sending Welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const emailContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );

    const response = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender's email
      to: email, // Recipient email
      subject: "Reset Password", // Email subject
      html: emailContent, // Email content
    });

    console.log("Reset password request sent:", response.messageId);
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
    throw new Error(`Error sending reset password email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const emailContent = PASSWORD_RESET_SUCCESS_TEMPLATE;

    const response = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender's email
      to: email, // Recipient email
      subject: "Reset Password successful", // Email subject
      html: emailContent, // Email content
    });

    console.log("Reset password successful:", response.messageId);
  } catch (error) {
    console.error(
      "Error sending reset password successful email:",
      error.message
    );
    throw new Error(
      `Error sending reset password successful email: ${error.message}`
    );
  }
};
