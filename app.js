require('dotenv').config()

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

// Config JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost'}));

// DB Connection
require('./config/db.js')

// Routes
const router = require('./routes/Router.js')
app.use(router)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});