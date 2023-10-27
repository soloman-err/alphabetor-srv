const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/alphabetor');

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
});

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  grade: String,
  school: String,
  address: String,
  city: String,
  state: String,
  zip: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = {
  Teacher,
  Student,
};
