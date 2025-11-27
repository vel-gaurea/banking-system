// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get('/test', function (req, res) {
  res.send('Hello from the backend! This is a test response.');
});

// app.get('/db-test', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT 1 + 1 AS result');
//     res.json({
//       status: 'success',
//       message: 'Database connected successfully!',
//       result: rows[0].result
//     });
//   } catch (error) {
//     console.error('DB Connection Error:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Database connection failed',
//       error: error.message
//     });
//   }
// });

app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS time");
    res.json({ message: "DB connected!", time: rows[0].time });
  } catch (error) {
    console.error("DB Test Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api', accountRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
