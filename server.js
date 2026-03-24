const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Basic middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log('=== DEBUG MIDDLEWARE CALLED ===');
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  console.log('=== END DEBUG ===');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Server test working' });
});

// Simple API test route
app.get('/api/simple-test', (req, res) => {
  console.log('Simple API test route hit!');
  res.json({ message: 'Simple API test working' });
});

console.log('Loading routes...');

// Routes
try {
  console.log('Loading auth routes...');
  app.use('/api/auth', require('./routes/auth'));
  console.log('Auth routes loaded successfully');
  
  console.log('Loading company routes...');
  app.use('/api/company', require('./routes/company'));
  console.log('Company routes loaded successfully');
  
  console.log('Loading contact routes...');
  app.use('/api/contact', require('./routes/contact'));
  console.log('Contact routes loaded successfully');
  
  console.log('Loading team routes...');
  app.use('/api/team', require('./routes/team'));
  console.log('Team routes loaded successfully');
  
  console.log('Loading services routes...');
  app.use('/api/services', require('./routes/services'));
  console.log('Services routes loaded successfully');
  
  console.log('Loading upload routes...');
  app.use('/api/upload', require('./routes/upload'));
  console.log('Upload routes loaded successfully');
  
  console.log('Loading home routes...');
  app.use('/api/home', require('./routes/home'));
  console.log('Home routes loaded successfully');
  
  console.log('Loading about routes...');
  app.use('/api/about', require('./routes/about'));
  console.log('About routes loaded successfully');
  
  console.log('Loading services page routes...');
  app.use('/api/services-page', require('./routes/servicesPage'));
  console.log('Services page routes loaded successfully');
  // Load team page routes
  console.log('Loading team page routes...');
  app.use('/api/team-page', require('./routes/teamPage'));
  console.log('Team page routes loaded successfully');

  // Load contact page routes
  console.log('Loading contact page routes...');
  app.use('/api/contact-page', require('./routes/contactPage'));
  console.log('Contact page routes loaded successfully');
  
  app.use('/api/markers', require('./routes/marker'));
  console.log('Markers routes loaded successfully!');

  app.use('/api/boundaries', require('./routes/boundary'));
  console.log('Boundaries routes loaded successfully!');
} catch (error) {
  console.error('Error loading routes:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler - MUST be last
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
connectDB();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});