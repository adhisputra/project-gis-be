const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      default: 'Our Services'
    },
    description: {
      type: String,
      default: 'We offer comprehensive technology solutions to help your business thrive in the digital age. From web development to cloud solutions, we\'ve got you covered.'
    }
  },
  services: {
    items: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      features: [{
        type: String,
        required: true
      }],
      iconType: {
        type: String,
        enum: ['web', 'mobile', 'cloud', 'consulting', 'design', 'support'],
        default: 'web'
      },
      icon: {
        type: String,
        default: ''
      }
    }]
  },
  process: {
    title: {
      type: String,
      default: 'Our Process'
    },
    subtitle: {
      type: String,
      default: 'We follow a proven methodology to ensure successful project delivery and client satisfaction.'
    },
    steps: [{
      step: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }]
  },
  cta: {
    title: {
      type: String,
      default: 'Ready to Start Your Project?'
    },
    description: {
      type: String,
      default: 'Let\'s discuss how we can help you achieve your business goals with our expert services.'
    },
    buttonText: {
      type: String,
      default: 'Get a Free Consultation'
    },
    buttonLink: {
      type: String,
      default: '/contact'
    }
  }
}, {
  timestamps: true
});

// Static method to get or create default services data
servicesSchema.statics.getOrCreateDefault = async function() {
  let services = await this.findOne();
  
  if (!services) {
    services = await this.create({
      services: {
        items: [
          {
            title: 'Web Development',
            description: 'Custom web applications built with modern technologies for optimal performance and user experience.',
            features: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'Security Implementation'],
            iconType: 'web'
          },
          {
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
            features: ['iOS Development', 'Android Development', 'Cross-Platform', 'App Store Optimization'],
            iconType: 'mobile'
          },
          {
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and migration services to modernize your business operations.',
            features: ['Cloud Migration', 'Infrastructure Setup', 'DevOps Implementation', 'Monitoring & Support'],
            iconType: 'cloud'
          },
          {
            title: 'Digital Consulting',
            description: 'Strategic guidance to help you navigate digital transformation and technology adoption.',
            features: ['Technology Strategy', 'Digital Transformation', 'Process Optimization', 'Technology Audit'],
            iconType: 'consulting'
          },
          {
            title: 'UI/UX Design',
            description: 'User-centered design solutions that create engaging and intuitive digital experiences.',
            features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
            iconType: 'design'
          },
          {
            title: 'Maintenance & Support',
            description: 'Ongoing support and maintenance services to keep your systems running smoothly.',
            features: ['24/7 Monitoring', 'Regular Updates', 'Bug Fixes', 'Performance Optimization'],
            iconType: 'support'
          }
        ]
      },
      process: {
        steps: [
          {
            step: '01',
            title: 'Discovery',
            description: 'We start by understanding your business goals, challenges, and requirements.'
          },
          {
            step: '02',
            title: 'Planning',
            description: 'We create a detailed project plan with timelines, milestones, and deliverables.'
          },
          {
            step: '03',
            title: 'Development',
            description: 'Our team builds your solution using best practices and cutting-edge technologies.'
          },
          {
            step: '04',
            title: 'Testing',
            description: 'Rigorous testing ensures quality, performance, and security standards are met.'
          },
          {
            step: '05',
            title: 'Deployment',
            description: 'We deploy your solution and provide training and documentation.'
          },
          {
            step: '06',
            title: 'Support',
            description: 'Ongoing support and maintenance to ensure continued success.'
          }
        ]
      }
    });
  }
  
  return services;
};

module.exports = mongoose.model('Services', servicesSchema);