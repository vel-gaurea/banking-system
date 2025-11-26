// models/userModel.js
const db = require('../db');

async function findByEmailOrUsername(identifier) {
  const [rows] = await db.query(
    'SELECT * FROM Users WHERE email = ? OR username = ?',
    [identifier, identifier]
  );
  return rows[0];
}

async function findByToken(token) {
  const [rows] = await db.query('SELECT * FROM Users WHERE access_token = ?', [token]);
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
  return rows[0];
}

async function updateToken(userId, token) {
  await db.query('UPDATE Users SET access_token = ? WHERE id = ?', [token, userId]);
}

async function createUser({ name, email, username, passwordHash, role='customer' }) {
  const [result] = await db.query(
    'INSERT INTO Users (name,email,username,password_hash,role) VALUES (?,?,?,?,?)',
    [name, email, username, passwordHash, role]
  );
  return result.insertId;
}

module.exports = { findByEmailOrUsername, findByToken, updateToken, createUser, findById };
