// controllers/accountController.js
const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');

async function getTransactions(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);
    // if the requester is customer, ensure userId == req.user.id
    if (req.user.role === 'customer' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const tx = await accountModel.getTransactionsForUser(userId);
    res.json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getBalance(req, res) {
  const userId = parseInt(req.params.userId, 10);
  if (req.user.role === 'customer' && req.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const bal = await accountModel.getLatestBalance(userId);
  res.json({ balance: bal });
}

async function deposit(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (req.user.role === 'customer' && req.user.id !== userId) return res.status(403).json({ error: 'Forbidden' });

    const { amount } = req.body;
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const current = await accountModel.getLatestBalance(userId);
    const newBal = parseFloat((current + amt).toFixed(2));

    await accountModel.insertTransaction({ user_id: userId, type: 'deposit', amount: amt, balance_after: newBal });
    res.json({ success: true, balance: newBal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function withdraw(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (req.user.role === 'customer' && req.user.id !== userId) return res.status(403).json({ error: 'Forbidden' });

    const { amount } = req.body;
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const current = await accountModel.getLatestBalance(userId);
    if (amt > current) return res.status(400).json({ error: 'Insufficient Funds' });

    const newBal = parseFloat((current - amt).toFixed(2));
    await accountModel.insertTransaction({ user_id: userId, type: 'withdraw', amount: amt, balance_after: newBal });
    res.json({ success: true, balance: newBal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function allAccounts(req, res) {
  try {
    // banker only
    const rows = await accountModel.getAllAccountsSummary();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getTransactions, deposit, withdraw, getBalance, allAccounts };
