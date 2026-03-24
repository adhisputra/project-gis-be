const mongoose = require('mongoose');
const boundarySchema = new mongoose.Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    coordinates: {
      type: [[[Number]]],
      required: true
    },
}, {
  timestamps: true
});

module.exports = mongoose.model('Boundary', boundarySchema);
