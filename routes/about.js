const express = require('express');
const About = require('../models/About');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/about - Get about page content
router.get('/', async (req, res) => {
  try {
    const about = await About.getOrCreateDefault();
    res.json(about);
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/about - Update about page content (protected)
router.put('/', protect, async (req, res) => {
  try {
    const {
      hero,
      mission,
      vision,
      values,
      journey,
      stats
    } = req.body;

    let about = await About.findOne();
    
    if (!about) {
      about = await About.getOrCreateDefault();
    }

    // Update fields if provided
    if (hero) about.hero = { ...about.hero, ...hero };
    if (mission) about.mission = { ...about.mission, ...mission };
    if (vision) about.vision = { ...about.vision, ...vision };
    if (values) about.values = { ...about.values, ...values };
    if (journey) about.journey = { ...about.journey, ...journey };
    if (stats) about.stats = { ...about.stats, ...stats };

    await about.save();
    res.json(about);
  } catch (error) {
    console.error('Error updating about data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;