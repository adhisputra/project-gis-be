const express = require('express');
const Marker = require('../models/Marker');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/markers - Get all markers
router.get('/', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
  } catch (error) {
    console.error('Error fetching markers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/markers - Add a new marker (protected)
router.post('/', async (req, res) => {
  console.log('Request body:', req.body);
  try {
    if (!req.body || !req.body.name || !req.body.lat || !req.body.lng) {
      return res.status(400).json({
        success: false,
        message: 'Name, lat, and lng are required'
      })
    }
    const newMarker = new Marker(req.body);
    await newMarker.save();

    res.status(201).json({
      success: true,
      message: 'Marker added successfully',
      data: newMarker
    })
  } catch (error) {
    console.error('Error adding marker:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// DELETE /api/markers/:id - Delete marker
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedMarker = await Marker.findByIdAndDelete(id);
    
    if (!deletedMarker) {
      return res.status(404).json({
        success: false,
        message: 'Marker not found'
      })
    }

    res.json({
      success: true,
      message: 'Marker deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting marker:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// PUT /api/markers - Update marker (protected)
// router.put('/', protect, async (req, res) => {
router.put('/:id', async (req, res) => {
  try {
    // if (!req.body || !req.body.name || !req.body.lat || !req.body.lng) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Name, lat, and lng are required'
    //   })
    // }
    const { id } = req.params;
    const {
      name,
      lat,
      lng,
      description,
      image_url
    } = req.body;

    let marker = await Marker.findById(id);
    
    if (!marker) {
      marker = await Marker.getOrCreateDefault();
    }

    // Update fields if provided
    if (name) marker.name = name;
    if (lat) marker.lat = lat;
    if (lng) marker.lng = lng;
    if (description) marker.description = description;
    if (image_url) marker.image_url = image_url;

    await marker.save();
    res.json({
      success: true,
      message: 'Marker updated successfully',
      data: marker
    });
  } catch (error) {
    console.error('Error updating marker:', error); 
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;