const express = require('express');
const { handleCreateJWT } = require('../controllers/auth');

const router = express.Router();

router.route('/').post(handleCreateJWT);

module.exports = router;
