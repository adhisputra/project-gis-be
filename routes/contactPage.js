const express = require('express');
const router = express.Router();
const ContactPage = require('../models/ContactPage');
const { protect } = require('../middleware/auth');

// GET /api/contact-page - Get contact page content
router.get('/', async (req, res) => {
  try {
    const contactPage = await ContactPage.getOrCreateDefault();
    res.json(contactPage);
  } catch (error) {
    console.error('Error fetching contact page:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/contact-page - Update contact page content (protected)
router.put('/', protect, async (req, res) => {
  try {
    const contactPage = await ContactPage.getOrCreateDefault();
    
    // Update fields
    if (req.body.hero) contactPage.hero = req.body.hero;
    if (req.body.contactInfo) contactPage.contactInfo = req.body.contactInfo;
    if (req.body.faqs) contactPage.faqs = req.body.faqs;
    if (req.body.cta) contactPage.cta = req.body.cta;
    
    await contactPage.save();
    
    res.json(contactPage);
  } catch (error) {
    console.error('Error updating contact page:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;