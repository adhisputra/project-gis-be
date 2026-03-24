const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Set mongoose options to handle buffering timeout
    mongoose.set('bufferCommands', false);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/company-profile', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
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
    console.log('Server will continue running without database connection')
    // Don't exit the process, allow server to run without DB
  }
}

module.exports = connectDB