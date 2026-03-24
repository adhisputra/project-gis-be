const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: String,
  avatar: String,
  skills: [{
    type: String
  }],
  experience: {
    type: Number,
    min: 0
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  socialMedia: {
    linkedin: String,
    twitter: String,
    github: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);