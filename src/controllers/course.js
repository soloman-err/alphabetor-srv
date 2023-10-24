const { Course } = require('../models/Course');

const handleGetAllCourses = async (req, res) => {
  try {
    const allCourses = await Course?.find({});
    return res.json(allCourses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleGetCourseById = async (req, res) => {
  try {
    const course = await Course?.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found!' });
    return res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleUpdateCourseById = async (req, res) => {
  try {
    await Course?.findByIdAndUpdate(req.params.id, {
      email: ' ',
    });
    return res.json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleDeleteCourseById = async (req, res) => {
  try {
    await Course?.findByIdAndDelete(req.params.id);
    return res.json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleCreateNewCourse = async (req, res) => {
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
};

module.exports = {
  handleGetAllCourses,
  handleGetCourseById,
  handleUpdateCourseById,
  handleDeleteCourseById,
  handleCreateNewCourse,
};
