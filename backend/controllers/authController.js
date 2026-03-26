const db = require('../config/db'); // 🔥 change here
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/mailer');


// 🟢 SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 5 * 60 * 1000;

    // check user
    const user = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      // insert new
      await db.query(
        "INSERT INTO users (email, otp, otp_expiry) VALUES ($1, $2, $3)",
        [email, otp, expiry]
      );
    } else {
      // update existing
      await db.query(
        "UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3",
        [otp, expiry, email]
      );
    }

    await sendEmail(email, otp);

    res.json({ message: 'OTP sent 📩' });

  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// ✅ VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user || user.otp != otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otp_expiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    await db.query(
      "UPDATE users SET is_verified = true WHERE email = $1",
      [email]
    );

    res.json({ message: 'OTP verified ✅' });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// 🟢 REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user || !user.is_verified) {
      return res.status(403).json({ message: 'Verify OTP first ❌' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET name = $1, password = $2, phone = $3 WHERE email = $4",
      [name, hashed, phone, email]
    );

    res.json({ message: 'Account created 🎉' });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// 🔑 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { id: user.id },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: 'Login success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};