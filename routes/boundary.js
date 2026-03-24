const express = require('express');
const Boundary = require('../models/Boundary');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/boundaries - Get all boundaries
router.get('/', protect, async (req, res) => {
  try {
    const boundaries = await Boundary.find();   
    res.json(boundaries);
  } catch (error) {
    console.error('Error fetching boundaries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/boundaries - Add a new boundary (protected)
router.post('/', async (req, res) => {
  console.log('Request body:', req.body);
  try {
    if (!req.body || !req.body.name || !req.body.description || !req.body.coordinates) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and coordinates are required'
      })
    }
    const newBoundary = new Boundary(req.body);
    await newBoundary.save();

    res.status(201).json({
      success: true,
      message: 'Boundary added successfully',
      data: newBoundary
    })
  } catch (error) {
    console.error('Error adding boundary:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// DELETE /api/boundaries/:id - Delete boundary 
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedBoundary = await Boundary.findByIdAndDelete(id);
    
    if (!deletedBoundary) {
      return res.status(404).json({
        success: false,
        message: 'Boundary not found'
      })
    }

    res.json({
      success: true,
      message: 'Boundary deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting boundary:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router;