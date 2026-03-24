const express = require('express')
const router = express.Router()
const Home = require('../models/Home')
const { protect } = require('../middleware/auth')

// GET /api/home - Get home page content
router.get('/', async (req, res) => {
  try {
    const home = await Home.getOrCreateDefault()
    
    res.json({
      success: true,
      data: home
    })
  } catch (error) {
    console.error('Error fetching home page content:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// PUT /api/home - Update home page content (admin only)
router.put('/', protect, async (req, res) => {
  try {
    // Find existing home page or create new one
    let home = await Home.findOne()
    
    if (home) {
      // Update existing home page
      Object.assign(home, req.body)
      await home.save()
    } else {
      // Create new home page
      home = new Home(req.body)
      await home.save()
    }
    
    res.json({
      success: true,
      message: 'Home page content updated successfully',
      data: home
    })
  } catch (error) {
    console.error('Error updating home page content:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router