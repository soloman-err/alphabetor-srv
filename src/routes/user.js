const express = require('express');
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require('../controllers/user');

const router = express.Router();

router
  .route('/:id')
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

router.route('/register').get(handleCreateNewUser);
router.route('/allUsers').get(handleGetAllUsers);

module.exports = router;
