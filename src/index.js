const express = require('express');
const { connectToDatabase } = require('../config/database');

const jwtRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const { logReqRes } = require('./middlewares');

const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');
require('dotenv').config();
const app = express();
const port = 2000;

// Database Connection:
connectToDatabase('mongodb://127.0.0.1:27017/alphabetor').then(() =>
  console.log('MongoDB Connected!')
);

// Middleware:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logReqRes('log.txt'));

// JWT:
app.use('/jwt', jwtRouter);

// Users:
app.use('/api/users', userRouter);

// Courses:
app.use('/api/courses', courseRouter);

// Default Server Response:
app.get('/', (req, res) => {
  res.send('Alphabetor Launched!');
});

app.listen(port, () => {
  console.log(`Alphabetor listening on port ${port}`);
});
