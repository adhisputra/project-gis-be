const mongoose = require('mongoose');

const teamPageSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      default: 'Meet Our Team'
    },
    description: {
      type: String,
      default: 'We\'re a diverse group of passionate professionals dedicated to delivering exceptional results and building lasting relationships with our clients.'
    }
  },
  leadership: {
    title: {
      type: String,
      default: 'Leadership Team'
    },
    subtitle: {
      type: String,
      default: 'Meet the leaders who drive our vision and guide our company forward.'
    },
    members: [{
      name: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      bio: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      social: {
        linkedin: String,
        twitter: String,
        github: String,
        dribbble: String,
        email: String
      }
    }]
  },
  departments: {
    title: {
      type: String,
      default: 'Our Departments'
    },
    subtitle: {
      type: String,
      default: 'Each department brings unique expertise and works together to deliver exceptional results.'
    },
    items: [{
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      iconType: {
        type: String,
        enum: ['engineering', 'design', 'operations', 'strategy'],
        default: 'engineering'
      }
    }]
  },
  joinUs: {
    title: {
      type: String,
      default: 'Join Our Team'
    },
    description: {
      type: String,
      default: 'We\'re always looking for talented individuals who share our passion for innovation and excellence.'
    },
    buttonText: {
      type: String,
      default: 'View Open Positions'
    },
    buttonLink: {
      type: String,
      default: 'mailto:careers@alfa.com'
    }
  }
}, {
  timestamps: true
});

// Static method to get or create default team page data
teamPageSchema.statics.getOrCreateDefault = async function() {
  let teamPage = await this.findOne();
  
  if (!teamPage) {
    teamPage = await this.create({
      leadership: {
        members: [
          {
            name: 'John Smith',
            position: 'CEO & Founder',
            bio: 'Visionary leader with 15+ years of experience in technology and business strategy.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            social: {
              linkedin: '#',
              twitter: '#',
              email: 'john@alfa.com'
            }
          },
          {
            name: 'Sarah Johnson',
            position: 'CTO',
            bio: 'Technical expert specializing in cloud architecture and scalable system design.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            social: {
              linkedin: '#',
              twitter: '#',
              email: 'sarah@alfa.com'
            }
          },
          {
            name: 'Michael Chen',
            position: 'Lead Developer',
            bio: 'Full-stack developer with expertise in modern web technologies and mobile development.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            social: {
              linkedin: '#',
              github: '#',
              email: 'michael@alfa.com'
            }
          },
          {
            name: 'Emily Rodriguez',
            position: 'UX/UI Designer',
            bio: 'Creative designer focused on creating intuitive and beautiful user experiences.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            social: {
              linkedin: '#',
              dribbble: '#',
              email: 'emily@alfa.com'
            }
          },
          {
            name: 'David Wilson',
            position: 'DevOps Engineer',
            bio: 'Infrastructure specialist ensuring reliable and scalable deployment solutions.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            social: {
              linkedin: '#',
              github: '#',
              email: 'david@alfa.com'
            }
          },
          {
            name: 'Lisa Thompson',
            position: 'Project Manager',
            bio: 'Experienced project manager ensuring smooth delivery and client satisfaction.',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            social: {
              linkedin: '#',
              twitter: '#',
              email: 'lisa@alfa.com'
            }
          }
        ]
      },
      departments: {
        items: [
          {
            name: 'Engineering',
            description: 'Our engineering team builds robust, scalable solutions using cutting-edge technologies.',
            count: 25,
            iconType: 'engineering'
          },
          {
            name: 'Design',
            description: 'Our design team creates beautiful, user-centered experiences that delight customers.',
            count: 8,
            iconType: 'design'
          },
          {
            name: 'Operations',
            description: 'Our operations team ensures smooth project delivery and exceptional client service.',
            count: 12,
            iconType: 'operations'
          },
          {
            name: 'Strategy',
            description: 'Our strategy team helps clients navigate digital transformation and growth.',
            count: 5,
            iconType: 'strategy'
          }
        ]
      }
    });
  }
  
  return teamPage;
};

module.exports = mongoose.model('TeamPage', teamPageSchema);