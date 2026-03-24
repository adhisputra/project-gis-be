const express = require('express')
const router = express.Router()
const Company = require('../models/Company')

// GET /api/company - Get company information
router.get('/', async (req, res) => {
  try {
    // Try to get company info from database
    let company = await Company.findOne();
    
    // If no company data exists, create default data
    if (!company) {
      company = new Company({
        name: 'Alfa',
        description: 'We are a leading technology company specializing in innovative digital solutions that help businesses transform and grow in the digital age.',
        mission: 'To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation.',
        vision: 'To be the global leader in digital transformation, creating a world where technology seamlessly enhances human potential.',
        founded: new Date('2015-01-01'),
        address: {
          street: '123 Business Street, Suite 100',
          city: 'City',
          state: 'State',
          zipCode: '12345',
          country: 'USA'
        },
        contact: {
          phone: '+1 (555) 123-4567',
          email: 'hello@alfa.com',
          website: 'https://www.alfa.com'
        },
        socialMedia: {
          linkedin: 'https://linkedin.com/company/alfa',
          twitter: 'https://twitter.com/alfa',
          facebook: 'https://facebook.com/alfa',
          instagram: 'https://instagram.com/alfa'
        },
        values: [
          'Innovation',
          'Quality', 
          'Collaboration',
          'Integrity'
        ]
      });
      await company.save();
    }

    res.json({
      success: true,
      data: company
    })
  } catch (error) {
    console.error('Error fetching company info:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// PUT /api/company - Update company information (admin only)
router.put('/', async (req, res) => {
  try {
    // Find existing company or create new one
    let company = await Company.findOne();
    
    if (company) {
      // Update existing company
      Object.assign(company, req.body);
      await company.save();
    } else {
      // Create new company
      company = new Company(req.body);
      await company.save();
    }
    
    res.json({
      success: true,
      message: 'Company information updated successfully',
      data: company
    })
  } catch (error) {
    console.error('Error updating company info:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router