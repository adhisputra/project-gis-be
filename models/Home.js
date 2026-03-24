const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  }
})

const statSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  }
})

const homeSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    title: {
      type: String,
      required: true,
      default: 'Building the Future with Innovation'
    },
    subtitle: {
      type: String,
      required: true,
      default: 'We are Alfa, a forward-thinking company dedicated to delivering exceptional solutions that transform businesses and create lasting value for our clients.'
    },
    primaryButtonText: {
      type: String,
      default: 'Our Services'
    },
    primaryButtonLink: {
      type: String,
      default: '/services'
    },
    secondaryButtonText: {
      type: String,
      default: 'Get in Touch'
    },
    secondaryButtonLink: {
      type: String,
      default: '/contact'
    }
  },
  
  // Features Section
  features: {
    title: {
      type: String,
      required: true,
      default: 'Why Choose Us'
    },
    subtitle: {
      type: String,
      required: true,
      default: 'We combine expertise, innovation, and dedication to deliver results that exceed expectations.'
    },
    items: [featureSchema]
  },
  
  // Stats Section
  stats: [statSchema],
  
  // CTA Section
  cta: {
    title: {
      type: String,
      required: true,
      default: 'Ready to Get Started?'
    },
    subtitle: {
      type: String,
      required: true,
      default: "Let's work together to bring your vision to life. Contact us today to discuss your project."
    },
    buttonText: {
      type: String,
      default: 'Start Your Project'
    },
    buttonLink: {
      type: String,
      default: '/contact'
    }
  }
}, {
  timestamps: true
})

// Create default home page data if none exists
homeSchema.statics.getOrCreateDefault = async function() {
  let home = await this.findOne()
  
  if (!home) {
    home = await this.create({
      hero: {
        title: 'Building the Future with Innovation',
        subtitle: 'We are Alfa, a forward-thinking company dedicated to delivering exceptional solutions that transform businesses and create lasting value for our clients.',
        primaryButtonText: 'Our Services',
        primaryButtonLink: '/services',
        secondaryButtonText: 'Get in Touch',
        secondaryButtonLink: '/contact'
      },
      features: {
        title: 'Why Choose Us',
        subtitle: 'We combine expertise, innovation, and dedication to deliver results that exceed expectations.',
        items: [
          {
            title: 'Innovation',
            description: 'We leverage cutting-edge technology to deliver innovative solutions that drive business growth.',
            icon: 'innovation'
          },
          {
            title: 'Quality',
            description: 'Our commitment to excellence ensures that every project meets the highest standards of quality.',
            icon: 'quality'
          },
          {
            title: 'Support',
            description: 'We provide comprehensive support to ensure your success every step of the way.',
            icon: 'support'
          }
        ]
      },
      stats: [
        { label: 'Projects Completed', value: '500+' },
        { label: 'Happy Clients', value: '200+' },
        { label: 'Years Experience', value: '10+' },
        { label: 'Team Members', value: '50+' }
      ],
      cta: {
        title: 'Ready to Get Started?',
        subtitle: "Let's work together to bring your vision to life. Contact us today to discuss your project.",
        buttonText: 'Start Your Project',
        buttonLink: '/contact'
      }
    })
  }
  
  return home
}

module.exports = mongoose.model('Home', homeSchema)