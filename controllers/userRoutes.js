const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

router.post('/', User.login)
router.post('/new', User.newUser)
router.get('/', User.getUserInfo)
router.delete('/', User.deleteSession)


module.exports = router