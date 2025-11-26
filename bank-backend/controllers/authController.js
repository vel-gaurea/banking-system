// controllers/authController.js
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userModel = require('../models/userModel');

async function login(req, res) {
  try {
    const { identifier, password } = req.body; // identifier = email or username
    if (!identifier || !password) return res.status(400).json({ error: 'Missing fields' });

    const user = await userModel.findByEmailOrUsername(identifier);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // generate 36-char token (18 bytes hex = 36 chars)
    const token = crypto.randomBytes(18).toString('hex');

    await userModel.updateToken(user.id, token);

    // return role and token
    res.json({
      token,
      role: user.role,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Optional: register (for testing)
async function register(req, res) {
  try {
    const { name, email, username, password, role='customer' } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const id = await userModel.createUser({ name, email, username, passwordHash: hash, role });
    res.json({ id });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { login, register };
