const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      default: 'Get In Touch'
    },
    description: {
      type: String,
      default: 'Ready to start your next project? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
    }
  },
  contactInfo: {
    title: {
      type: String,
      default: 'Contact Information'
    },
    items: [{
      title: String,
      details: [String],
      icon: String
    }]
  },
  faqs: {
    title: {
      type: String,
      default: 'Frequently Asked Questions'
    },
    subtitle: {
      type: String,
      default: 'Find answers to common questions about our services and process.'
    },
    items: [{
      question: String,
      answer: String
    }]
  },
  cta: {
    title: {
      type: String,
      default: 'Ready to Get Started?'
    },
    description: {
      type: String,
      default: 'Let\'s discuss your project and see how we can help bring your vision to life.'
    },
    buttonText: {
      type: String,
      default: 'Call Us Now'
    },
    buttonLink: {
      type: String,
      default: 'tel:+15551234567'
    }
  }
}, {
  timestamps: true
});

// Static method to get or create default contact page data
contactPageSchema.statics.getOrCreateDefault = async function() {
  let contactPage = await this.findOne();
  
  if (!contactPage) {
    contactPage = await this.create({
      hero: {
        title: 'Get In Touch',
        description: 'Ready to start your next project? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
      },
      contactInfo: {
        title: 'Contact Information',
        items: [
          {
            title: 'Office Address',
            details: ['123 Business Street', 'Suite 100', 'City, State 12345'],
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
          },
          {
            title: 'Phone Number',
            details: ['+1 (555) 123-4567', 'Mon - Fri: 9:00 AM - 6:00 PM'],
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>'
          },
          {
            title: 'Email Address',
            details: ['hello@alfa.com', 'support@alfa.com'],
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
          },
          {
            title: 'Business Hours',
            details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
          }
        ]
      },
      faqs: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common questions about our services and process.',
        items: [
          {
            question: 'What services do you offer?',
            answer: 'We offer a comprehensive range of digital services including web development, mobile app development, cloud solutions, and digital transformation consulting.'
          },
          {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary depending on scope and complexity. Simple websites typically take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation.'
          },
          {
            question: 'Do you provide ongoing support?',
            answer: 'Yes, we offer comprehensive maintenance and support packages to ensure your digital solutions continue to perform optimally after launch.'
          },
          {
            question: 'What is your development process?',
            answer: 'We follow an agile development methodology with regular client check-ins, iterative development cycles, and continuous testing to ensure quality and alignment with your goals.'
          }
        ]
      },
      cta: {
        title: 'Ready to Get Started?',
        description: 'Let\'s discuss your project and see how we can help bring your vision to life.',
        buttonText: 'Call Us Now',
        buttonLink: 'tel:+15551234567'
      }
    });
  }
  
  return contactPage;
};

module.exports = mongoose.model('ContactPage', contactPageSchema);