const express = require('express');
const { connectToDatabase } = require('../config/database');

const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const { logReqRes } = require('./middlewares');

const app = express();
const port = 2000;

// Database Connection:
connectToDatabase('mongodb://127.0.0.1:27017/alphabetor').then(() =>
  console.log('MongoDB Connected!')
);

// Middleware:
app.use(express.urlencoded({ extended: true }));
// app.use(logReqRes('log.txt'));

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
