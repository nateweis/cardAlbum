const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

router.post('/', User.login)
router.get('/', User.getUserInfo)


module.exports = router