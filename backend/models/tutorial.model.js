const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: Number, required: true },
  students: { type: Array, required: true },
  tutor: { type: String, required: true },
  fee: { type: Number, required: true },
  tutorialNum: { type: Number, required: true },
  attendance: { type: String, required: true },
  subject: { type: String, required: true },
  notes: { type: String, required: false }
  
}, {
  timestamps: true,
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;