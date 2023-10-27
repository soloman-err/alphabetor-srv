const mongoose = require('mongoose');

const connectToDatabase = async (url) => {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectToDatabase };
