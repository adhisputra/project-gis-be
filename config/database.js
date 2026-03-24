const mongoose = require('mongoose')

// Set mongoose options to handle buffering timeout
// Setting bufferCommands to true (default) allows Mongoose to queue queries
// until the initial connection is complete.
mongoose.set('bufferCommands', true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/company-profile', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: true // Ensure buffering is enabled during connection
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('MongoDB connection closed through app termination')
      process.exit(0)
    })

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    // Re-throw error to be handled by caller (e.g. server.js)
    throw error;
  }
}

module.exports = connectDB