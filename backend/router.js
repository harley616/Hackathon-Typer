const express = require('express');
const router = express.Router();
const {registerUser, postScore} = require('./controller');
// Auth Controller Imports
// const {
//   verify,
// } = require('../middleware');
const sendSuccessResponse = require('./middleware');




router.post('/register', registerUser);
router.post('/score', postScore);

module.exports = router;