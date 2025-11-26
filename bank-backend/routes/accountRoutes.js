// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

// Protected endpoints
router.get('/user/:userId/transactions', requireAuth, accountController.getTransactions);
router.get('/user/:userId/balance', requireAuth, accountController.getBalance);
router.post('/user/:userId/deposit', requireAuth, accountController.deposit);
router.post('/user/:userId/withdraw', requireAuth, accountController.withdraw);

// Banker-only
router.get('/accounts/all', requireAuth, requireRole('banker'), accountController.allAccounts);

module.exports = router;
