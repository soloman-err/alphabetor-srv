const express = require('express');
const {
  handleGetAllCourses,
  handleGetCourseById,
  handleUpdateCourseById,
  handleDeleteCourseById,
  handleCreateNewCourse,
} = require('../controllers/course');

const router = express.Router();

router.route('/').get(handleGetAllCourses).post(handleCreateNewCourse);

router
  .route('/:id')
  .get(handleGetCourseById)
  .patch(handleUpdateCourseById)
  .delete(handleDeleteCourseById);

module.exports = router;
