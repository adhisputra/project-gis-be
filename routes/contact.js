const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const Contact = require('../models/Contact')
const { protect } = require('../middleware/auth')

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions, please try again later.'
  }
})

// POST /api/contact - Submit contact form
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, company, phone, subject, message, serviceInterest, budget, timeline } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }

    // Create new contact submission
    const contactSubmission = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
      serviceInterest: serviceInterest || undefined,
      budget: budget ? { range: budget } : undefined,
      timeline: timeline || undefined,
      status: 'new',
      priority: 'medium',
      isRead: false
    })

    await contactSubmission.save()

    // In a real application, you would also:
    // 1. Send notification email to admin
    // 2. Send confirmation email to client
    // 3. Add to CRM system
    // 4. Create follow-up tasks

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contactSubmission._id,
        submittedAt: contactSubmission.createdAt
      }
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again later.'
    })
  }
})

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query
    
    // Build filter object
    const filter = {}
    if (status) filter.status = status
    if (priority) filter.priority = priority
    
    // Calculate pagination
    const skip = (page - 1) * limit
    
    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Contact.countDocuments(filter)
    
    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          count: contacts.length,
          totalRecords: total
        }
      }
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// GET /api/contact/:id - Get specific contact submission
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findById(id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }
    
    // Mark as read when viewed
    if (!contact.isRead) {
      contact.isRead = true
      await contact.save()
    }

    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { id } = req.params
    const { status, priority, notes, assignedTo } = req.body
    
    const updateData = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (notes) updateData.notes = notes
    if (assignedTo) updateData.assignedTo = assignedTo
    
    const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true })
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    })
  } catch (error) {
    console.error('Error updating contact status:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// DELETE /api/contact/:id - Delete contact submission
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params
    const deletedContact = await Contact.findByIdAndDelete(id)
    
    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router