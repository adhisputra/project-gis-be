const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  serviceInterest: {
    type: String,
    enum: ['web-development', 'mobile-development', 'design', 'consulting', 'marketing', 'other']
  },
  budget: {
    range: {
      type: String,
      enum: ['under-5k', '5k-10k', '10k-25k', '25k-50k', 'over-50k', 'not-specified']
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  timeline: {
    type: String,
    enum: ['asap', '1-month', '2-3-months', '3-6-months', 'flexible']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  notes: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);