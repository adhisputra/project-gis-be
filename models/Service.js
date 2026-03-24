const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: ['web-development', 'mobile-development', 'design', 'consulting', 'marketing', 'other']
  },
  features: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'project-based', 'custom'],
      default: 'custom'
    },
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  duration: {
    estimated: String,
    unit: {
      type: String,
      enum: ['hours', 'days', 'weeks', 'months'],
      default: 'weeks'
    }
  },
  images: [String],
  icon: String,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);