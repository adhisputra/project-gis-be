const express = require('express');
const Services = require('../models/Services');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/services-page - Get services page content
router.get('/', async (req, res) => {
  try {
    const services = await Services.getOrCreateDefault();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services page data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/services-page - Update services page content (protected)
router.put('/', protect, async (req, res) => {
  try {
    const {
      hero,
      services,
      process,
      cta
    } = req.body;

    let servicesData = await Services.findOne();
    
    if (!servicesData) {
      servicesData = await Services.getOrCreateDefault();
    }

    // Update fields if provided
    if (hero) servicesData.hero = { ...servicesData.hero, ...hero };
    if (services) servicesData.services = { ...servicesData.services, ...services };
    if (process) servicesData.process = { ...servicesData.process, ...process };
    if (cta) servicesData.cta = { ...servicesData.cta, ...cta };

    await servicesData.save();
    res.json(servicesData);
  } catch (error) {
    console.error('Error updating services page data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;