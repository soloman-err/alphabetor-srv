const mongoose = require('mongoose');

const connectToDatabase = async (url) => {
  return await mongoose.connect(url);
};

module.exports = { connectToDatabase };
