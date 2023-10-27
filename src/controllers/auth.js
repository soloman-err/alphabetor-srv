const jwt = require('jsonwebtoken');
const cors = require('cors');

const express = require('express');
const app = express();
app.use(cors());

const handleCreateJWT = () => {
  (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    res.send({ token });
  };
};

module.exports = { handleCreateJWT };
