const express = require('express')
const router = express.Router()
const Service = require('../models/Service')

// GET /api/services - Get all services
router.get('/', async (req, res) => {
  try {
    // Get services from database
    let services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    
    // If no services exist, create sample data
    if (services.length === 0) {
      const sampleServices = [
        {
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies and best practices. We create responsive, scalable, and user-friendly websites that drive business growth.',
          shortDescription: 'Modern, responsive websites and web applications.',
          category: 'web-development',
          features: [
            'Responsive Design',
            'Modern Frameworks',
            'SEO Optimization',
            'Performance Optimization',
            'Cross-browser Compatibility'
          ],
          technologies: ['React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'PHP'],
          pricing: {
            type: 'project-based',
            amount: 5000,
            currency: 'USD'
          },
          duration: {
            estimated: '4-8',
            unit: 'weeks'
          },
          icon: 'web',
          order: 1,
          isActive: true
        },
        {
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for iOS and Android. We build apps that provide excellent user experience and performance.',
          shortDescription: 'iOS and Android mobile applications.',
          category: 'mobile-development',
          features: [
            'Native Performance',
            'Cross-platform Development',
            'App Store Optimization',
            'Push Notifications',
            'Offline Functionality'
          ],
          technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
          pricing: {
            type: 'project-based',
            amount: 8000,
            currency: 'USD'
          },
          duration: {
            estimated: '6-12',
            unit: 'weeks'
          },
          icon: 'mobile',
          order: 2,
          isActive: true
        },
        {
          title: 'UI/UX Design',
          description: 'User-centered design solutions that create intuitive and engaging digital experiences. We focus on usability, accessibility, and visual appeal.',
          shortDescription: 'User interface and experience design.',
          category: 'design',
          features: [
            'User Research',
            'Wireframing & Prototyping',
            'Visual Design',
            'Usability Testing',
            'Design Systems'
          ],
          technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
          pricing: {
            type: 'project-based',
            amount: 3000,
            currency: 'USD'
          },
          duration: {
            estimated: '2-6',
            unit: 'weeks'
          },
          icon: 'design',
          order: 3,
          isActive: true
        }
      ];
      
      // Save sample data to database
      services = await Service.insertMany(sampleServices);
    }

    res.json({
      success: true,
      data: services
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// GET /api/services/:id - Get specific service
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      data: service
    })
  } catch (error) {
    console.error('Error fetching service:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// GET /api/services/categories - Get service categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// POST /api/services - Add new service
router.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();

    res.status(201).json({
      success: true,
      message: 'Service added successfully',
      data: newService
    })
  } catch (error) {
    console.error('Error adding service:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// PUT /api/services/:id - Update service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService
    })
  } catch (error) {
    console.error('Error updating service:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// DELETE /api/services/:id - Delete service
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedService = await Service.findByIdAndDelete(id);
    
    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting service:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router