const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  acceptTerms: {
    type: Boolean,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
