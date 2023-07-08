const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String, required: true},
  firstname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  surname: { type: String, required: true, minlength: 3},
  phone: { type: String, required: true},
  email: { type: String, required: true},
  addressOne: { type: String, required: true},
  addressTwo: {type: String, required: false},
  town: { type: String, required: true},
  city: { type: String, required: true},
  job: {type: String, required:  false},
  eircode: { type: String, required: false},
  dob: { type: String, required: false},
  parent: { type: String, required: false},
  virtual: { type: String, required: false},
  gender: { type: String, required: false},

  


}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
