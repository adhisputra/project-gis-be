const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3002;

// Basic middleware
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test server working' });
});

// Auth test route
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth test working' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});