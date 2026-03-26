const db = require('../config/db');

// 🔹 Get User
exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email=?", [email],
      (err, res) => err ? reject(err) : resolve(res[0])
    );
  });
};

// 🔹 Save OTP
exports.saveOtp = (email, otp, expiry) => {
  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO users (email, otp, otp_expiry)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE otp=?, otp_expiry=?
    `;

    db.query(sql, [email, otp, expiry, otp, expiry],
      (err, res) => err ? reject(err) : resolve(res)
    );
  });
};

// 🔹 Verify User
exports.markVerified = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET is_verified = true WHERE email=?",
      [email],
      (err, res) => err ? reject(err) : resolve(res)
    );
  });
};

// 🔹 Complete Registration
exports.completeRegistration = (name, password, phone, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET name=?, password=?, phone=? WHERE email=?`,
      [name, password, phone, email],
      (err, res) => err ? reject(err) : resolve(res)
    );
  });
};