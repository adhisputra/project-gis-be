const express = require('express')
const router = express.Router()
const Team = require('../models/Team')

// GET /api/team - Get all team members
router.get('/', async (req, res) => {
  try {
    // Get team members from database
    let teamMembers = await Team.find({ isActive: true }).sort({ joinDate: 1 });
    
    // If no team members exist, create sample data
    if (teamMembers.length === 0) {
      const sampleTeam = [
        {
          name: 'John Smith',
          position: 'CEO & Founder',
          department: 'Executive',
          bio: 'Visionary leader with 15+ years of experience in technology and business strategy.',
          email: 'john@alfa.com',
          phone: '+1 (555) 123-4567',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          skills: ['Leadership', 'Strategy', 'Business Development'],
          experience: 15,
          socialMedia: {
            linkedin: 'https://linkedin.com/in/johnsmith',
            twitter: 'https://twitter.com/johnsmith'
          },
          joinDate: new Date('2015-01-01'),
          isActive: true
        },
        {
          name: 'Sarah Johnson',
          position: 'CTO',
          department: 'Engineering',
          bio: 'Technical expert specializing in cloud architecture and scalable system design.',
          email: 'sarah@alfa.com',
          phone: '+1 (555) 123-4568',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          skills: ['Cloud Architecture', 'System Design', 'DevOps'],
          experience: 12,
          socialMedia: {
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            github: 'https://github.com/sarahjohnson'
          },
          joinDate: new Date('2016-03-15'),
          isActive: true
        }
      ];
      
      // Save sample data to database
      teamMembers = await Team.insertMany(sampleTeam);
    }

    res.json({
      success: true,
      data: teamMembers
    })
  } catch (error) {
    console.error('Error fetching team data:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// GET /api/team/:id - Get specific team member
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const teamMember = await Team.findById(id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    res.json({
      success: true,
      data: teamMember
    })
  } catch (error) {
    console.error('Error fetching team member:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// POST /api/team - Add new team member
router.post('/', async (req, res) => {
  try {
    const newTeamMember = new Team(req.body);
    await newTeamMember.save();

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: newTeamMember
    })
  } catch (error) {
    console.error('Error adding team member:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// PUT /api/team/:id - Update team member
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedTeamMember = await Team.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedTeamMember
    })
  } catch (error) {
    console.error('Error updating team member:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// DELETE /api/team/:id - Delete team member
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedTeamMember = await Team.findByIdAndDelete(id);
    
    if (!deletedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting team member:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router