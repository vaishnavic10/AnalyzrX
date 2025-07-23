// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('File', fileSchema);
