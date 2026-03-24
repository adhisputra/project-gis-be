const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      default: 'About Alfa'
    },
    description: {
      type: String,
      default: 'We are a passionate team of innovators, designers, and developers committed to creating exceptional digital experiences that drive business success.'
    }
  },
  mission: {
    title: {
      type: String,
      default: 'Our Mission'
    },
    description: {
      type: String,
      default: 'To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital age.'
    },
    additionalText: {
      type: String,
      default: 'We believe that technology should be accessible, reliable, and transformative. Our mission is to bridge the gap between complex technical challenges and practical business solutions.'
    }
  },
  vision: {
    title: {
      type: String,
      default: 'Our Vision'
    },
    description: {
      type: String,
      default: 'To be the leading technology partner for businesses worldwide, recognized for our innovation, quality, and commitment to client success.'
    }
  },
  values: {
    title: {
      type: String,
      default: 'Our Values'
    },
    subtitle: {
      type: String,
      default: 'These core values guide everything we do and shape our company culture.'
    },
    items: [{
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
  journey: {
    title: {
      type: String,
      default: 'Our Journey'
    },
    subtitle: {
      type: String,
      default: 'From humble beginnings to industry leadership - here\'s our story.'
    },
    milestones: [{
      year: {
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
  stats: {
    title: {
      type: String,
      default: 'Our Impact'
    },
    subtitle: {
      type: String,
      default: 'Numbers that reflect our commitment to excellence.'
    },
    items: [{
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    }]
  }
}, {
  timestamps: true
});

// Static method to get or create default about data
aboutSchema.statics.getOrCreateDefault = async function() {
  let about = await this.findOne();
  
  if (!about) {
    about = await this.create({
      values: {
        items: [
          {
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from the smallest details to the biggest challenges.'
          },
          {
            title: 'Innovation',
            description: 'We embrace new technologies and creative solutions to stay ahead of the curve.'
          },
          {
            title: 'Integrity',
            description: 'We conduct business with honesty, transparency, and ethical practices.'
          },
          {
            title: 'Collaboration',
            description: 'We believe in the power of teamwork and building strong partnerships with our clients.'
          }
        ]
      },
      journey: {
        milestones: [
          {
            year: '2014',
            title: 'Company Founded',
            description: 'Started our journey with a vision to transform businesses through technology.'
          },
          {
            year: '2016',
            title: 'First Major Client',
            description: 'Secured our first enterprise client and delivered a successful digital transformation project.'
          },
          {
            year: '2018',
            title: 'Team Expansion',
            description: 'Grew our team to 25+ professionals and opened our second office.'
          },
          {
            year: '2020',
            title: 'Global Reach',
            description: 'Expanded internationally and started serving clients across multiple continents.'
          },
          {
            year: '2023',
            title: 'Innovation Hub',
            description: 'Launched our innovation lab focusing on AI and emerging technologies.'
          }
        ]
      },
      stats: {
        items: [
          {
            value: '500+',
            label: 'Projects Delivered'
          },
          {
            value: '200+',
            label: 'Happy Clients'
          },
          {
            value: '50+',
            label: 'Team Members'
          },
          {
            value: '10+',
            label: 'Years Experience'
          }
        ]
      }
    });
  }
  
  return about;
};

module.exports = mongoose.model('About', aboutSchema);