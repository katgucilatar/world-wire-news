const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const SALT_ROUNDS = 10;

const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

const sendResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`,
    html: `<p>You requested a password reset. Click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending reset email:", error);
    return false;
  }
};

const generateResetToken = () => crypto.randomBytes(20).toString("hex");

module.exports = {
  generateResetToken,
  sendResetEmail,
  hashPassword,
};
