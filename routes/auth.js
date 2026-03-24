const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/auth')
// const rateLimit = require('express-rate-limit') // temporarily removed

const router = express.Router()

// @desc    Test route
// @route   GET /api/auth/test
// @access  Public
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working', timestamp: new Date().toISOString() })
})

// @desc    Simple test route
// @route   GET /api/auth/simple
// @access  Public
router.get('/simple', (req, res) => {
  res.json({ message: 'Simple route working', timestamp: new Date().toISOString() })
})

// @desc    Database status
// @route   GET /api/auth/db-status
// @access  Public
router.get('/db-status', (req, res) => {
  const mongoose = require('mongoose')
  res.json({
    connected: mongoose.connection.readyState === 1,
    state: mongoose.connection.readyState
  })
})

// Rate limiting completely removed for testing
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // increased limit for testing
//   message: {
//     error: 'Too many authentication attempts, please try again later'
//   },
//   standardHeaders: true,
//   legacyHeaders: false
// })

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}

// @desc    Test database connection
// @route   GET /api/auth/test-db
// @access  Public
router.get('/test-db', async (req, res) => {
  try {
    const mongoose = require('mongoose')
    const connectionState = mongoose.connection.readyState
    const dbName = mongoose.connection.db ? mongoose.connection.db.databaseName : 'Not connected'
    const host = mongoose.connection.host || 'localhost'
    
    res.json({
      success: true,
      connectionState: connectionState,
      database: dbName,
      host: host
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or username already exists'
      })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role: role || 'editor' // Default role
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive
        }
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      })
    }

    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    })
  }
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      })
    }

    // Check for user and include password
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated. Please contact administrator.'
      })
    }

    // Check password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    })
  }
})

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        }
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { firstName, lastName, avatar } = req.body
    
    const user = await User.findById(req.user.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    // Update fields
    if (firstName !== undefined) user.firstName = firstName
    if (lastName !== undefined) user.lastName = lastName
    if (avatar !== undefined) user.avatar = avatar

    await user.save()

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          avatar: user.avatar,
          isActive: user.isActive
        }
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      error: 'Server error during profile update'
    })
  }
})

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide current and new password'
      })
    }

    const user = await User.findById(req.user.id).select('+password')

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Change password error:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      })
    }

    res.status(500).json({
      success: false,
      error: 'Server error during password change'
    })
  }
})

// @desc    Logout user (client-side token removal)
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful. Please remove token from client.'
  })
})

module.exports = router