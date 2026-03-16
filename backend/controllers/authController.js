// const otpGenerator = require("otp-generator");

// let otpStore = {};

// exports.sendOtp = (req, res) => {
//   const { mobile } = req.body;

//   const otp = otpGenerator.generate(6, {
//     upperCaseAlphabets: false,
//     specialChars: false,
//   });

//   otpStore[mobile] = otp;

//   console.log("OTP:", otp);

//   res.json({
//     message: "OTP Sent",
//   });
// };

// exports.verifyOtp = (req, res) => {
//   const { mobile, otp } = req.body;

//   if (otpStore[mobile] === otp) {
//     delete otpStore[mobile];

//     res.json({
//       message: "OTP Verified",
//     });
//   } else {
//     res.status(400).json({
//       message: "Invalid OTP",
//     });
//   }
// };
