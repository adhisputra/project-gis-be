const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')

      // Get user from database
      const user = await User.findById(decoded.userId)
      
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found or inactive'
        })
      }

      // Add user info to request
      req.user = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }

      next()
    } catch (error) {
      console.error('Token verification failed:', error)
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      })
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    })
  }
}

// Admin only access
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    })
  }
}

// Generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  })
}

// Verify token without throwing error (for optional auth)
const optionalAuth = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
      
      // Get user from database
      const user = await User.findById(decoded.userId)
      
      if (user && user.isActive) {
        req.user = {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }
    } catch (error) {
      // Token invalid but continue without user
      req.user = null
    }
  }

  next()
}

module.exports = {
  protect,
  adminOnly,
  generateToken,
  optionalAuth
}