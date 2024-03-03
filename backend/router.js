const express = require('express');
const router = express.Router();
const {registerUser} = require('./controller');
// Auth Controller Imports
// const {
//   verify,
// } = require('../middleware');
const sendSuccessResponse = require('./middleware');




router.post('/register', registerUser, sendSuccessResponse);

module.exports = router;