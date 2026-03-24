const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Basic middleware
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Minimal server test working' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Minimal server running on port ${PORT}`);
});