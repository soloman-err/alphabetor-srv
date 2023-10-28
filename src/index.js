const express = require('express');
const { connectToDatabase } = require('../config/database');

const jwtRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const User = require('./models/user');
require('dotenv').config();
const app = express();
const PORT = 2000;

// Database Connection:
connectToDatabase(process.env.MONGODB_URI).then(() =>
  console.log('MongoDB Connected!')
);

// Middleware:
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT:
app.post('/jwt', (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  res.send({ token });
});

// Users:
app.use('/users', userRouter);

app.post('/users/register', async (req, res) => {
  try {
    const user = new User(req.body);

    if (!user?.email) {
      return res.status(400).json({ errors: ['Email is required'] });
    }

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: ['Email already used in another account!'] });
    }

    const validationError = user.validateSync();
    if (validationError) {
      const errors = Object.keys(validationError.errors).map(
        (key) => validationError.errors[key].message
      );
      return res.status(400).json({ errors });
    }

    await user.save();
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: ['Server error'] });
  }
});

app.patch('/users/update-role/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { role } = req.body;
    console.log('Received email:', email);

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required!' });
    }

    const user = await User.findOneAndUpdate({ email: email }, { role: role });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ status: 'Success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Courses:
app.use('/courses', courseRouter);

// Default Server Response:
app.get('/', (req, res) => {
  res.send('Alphabetor Launched!');
});

app.listen(PORT, () => {
  console.log(`Alphabetor listening on port >> ${PORT}`);
});
