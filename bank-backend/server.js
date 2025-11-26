// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/test', function (req, res) {
  res.send('Hello from the backend! This is a test response.');
});

app.use('/api/auth', authRoutes);
app.use('/api', accountRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
