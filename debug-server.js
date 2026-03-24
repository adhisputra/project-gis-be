const express = require('express');
const app = express();
const PORT = 3003;

console.log('Starting debug server...');
console.log('Express version:', require('express/package.json').version);

// Basic middleware
app.use(express.json());
console.log('JSON middleware added');

// Debug middleware
app.use((req, res, next) => {
  console.log('=== DEBUG: Request received ===');
  console.log(`${req.method} ${req.path}`);
  console.log('=== END DEBUG ===');
  next();
});
console.log('Debug middleware added');

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Test working' });
});
console.log('Test route added');

// Health route
app.get('/health', (req, res) => {
  console.log('Health route hit!');
  res.json({ message: 'Health OK' });
});
console.log('Health route added');

// 404 handler
app.use((req, res) => {
  console.log('404 handler hit for:', req.path);
  res.status(404).json({ message: 'Route not found' });
});
console.log('404 handler added');

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Debug server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});

console.log('Server setup complete');