const express = require('express');
const TeamPage = require('../models/TeamPage');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/team-page - Get team page content
router.get('/', async (req, res) => {
  try {
    const teamPage = await TeamPage.getOrCreateDefault();
    res.json(teamPage);
  } catch (error) {
    console.error('Error fetching team page data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/team-page - Update team page content (protected)
router.put('/', protect, async (req, res) => {
  try {
    const {
      hero,
      leadership,
      departments,
      joinUs
    } = req.body;

    let teamPage = await TeamPage.findOne();
    
    if (!teamPage) {
      teamPage = await TeamPage.getOrCreateDefault();
    }

    // Update fields if provided
    if (hero) teamPage.hero = { ...teamPage.hero, ...hero };
    if (leadership) teamPage.leadership = { ...teamPage.leadership, ...leadership };
    if (departments) teamPage.departments = { ...teamPage.departments, ...departments };
    if (joinUs) teamPage.joinUs = { ...teamPage.joinUs, ...joinUs };

    await teamPage.save();
    res.json(teamPage);
  } catch (error) {
    console.error('Error updating team page data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;