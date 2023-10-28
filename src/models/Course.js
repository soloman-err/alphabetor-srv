const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  instructor: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
    trim: true,
    // validate: {
    //   validator: function (value) {
    //     const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
    //     return urlRegex.test(value);
    //   },
    //   message: 'Invalid imgUrl format',
    // },
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  skillsTaught: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: String,
  },
  certification: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  support: {
    type: String,
    required: true,
  },
  networking: {
    type: String,
  },
  tools: {
    type: String,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = {
  Course,
};
