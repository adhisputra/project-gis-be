const mongoose = require('mongoose');
const markerSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    lat: {type: String, default: ''},
    lng: {type: String, default: ''},
    description: {type: String, default: ''},
    image_url: {type: String, default: ''},
}, {
  timestamps: true
});

module.exports = mongoose.model('Marker', markerSchema);
