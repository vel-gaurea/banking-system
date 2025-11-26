// middleware/authMiddleware.js
const userModel = require('../models/userModel');

async function requireAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });

  // header format: Authorization: Bearer <token> OR just token
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

  const user = await userModel.findByToken(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  req.user = user; // attach user object
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { requireAuth, requireRole };
