// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vermashobhit616@gmail.com',
    pass: 'sxjp hept scgp aemc'
  }
});

exports.sendEmail = (to, otp) => {
  return transporter.sendMail({
    to,
    subject: 'OTP Verification',
    html: `<h2>Your OTP: ${otp}</h2>`
  });
};