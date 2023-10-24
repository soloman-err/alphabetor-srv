const express = require('express');
const app = express();
const port = 2000;
const mongoose = require('mongoose');

// Connection:
mongoose
  .connect('mongodb://127.0.0.1:27017/alphabetor')
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('Mongo Err', err));

// Middleware:
app.use(express.json());

// Schema:
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

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);

// Routes:-------------------------->>>
// Users:
app.get('/users', async (req, res) => {
  try {
    const allDBUsers = await User?.find({});
    // return res.json(allDBUsers);
    const html = `<ul>
      ${allDBUsers
        ?.map((user) => `<li>${user?.name} - ${user?.email}</li>`)
        .join('')}
    </ul>`;
    res.send(html);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found!' });
  return res.json(user);
});

app.patch('/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    email: 'harry@gmail.com',
  });
  return res.json({ status: 'Success' });
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: 'Success' });
});

app.post('/users', async (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body || !body.name || !body.email || !body.jobTitle) {
    return res.status(400).json({ msg: 'All fields are required!' });
  }

  try {
    const result = await User.create({
      name: body.name,
      email: body.email,
      jobTitle: body.jobTitle,
    });

    console.log('result', result);
    return res.status(201).json({ msg: 'success!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Courses:
app.get('/courses', async (req, res) => {
  try {
    const allCourses = await Course?.find({});
    return res.json(allCourses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
});

app.get('/courses/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found!' });
  return res.json(course);
});

app.post('/courses', async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.courseId ||
    !body.title ||
    !body.description ||
    !body.duration ||
    !body.instructor ||
    !body.imgURL ||
    !body.category ||
    !body.url ||
    !body.level ||
    !body.language ||
    !body.skillsTaught ||
    !body.prerequisites ||
    !body.certification ||
    !body.fees ||
    !body.startDate ||
    !body.support ||
    !body.networking ||
    !body.tools
  ) {
    return res.status(400).json({ msg: 'All fields are required!' });
  }

  const result = await Course.create({
    courseId: body.courseId,
    title: body.title,
    description: body.description,
    duration: body.duration,
    instructor: body.instructor,
    imgURL: body.imgURL,
    category: body.category,
    url: body.url,
    level: body.level,
    language: body.language,
    skillsTaught: body.skillsTaught,
    prerequisites: body.prerequisites,
    certifications: body.certifications,
    fees: body.fees,
    startDate: body.startDate,
    support: body.support,
    networking: body.networking,
    tools: body.tools,
  });

  console.log('result: ', result);
  return res.status(201).json({ msg: 'Success' });
});

app.get('/', (req, res) => {
  res.send('Alphabetor Launched!');
});

app.listen(port, () => {
  console.log(`Alphabetor listening on port ${port}`);
});
