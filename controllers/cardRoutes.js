const express = require('express');
const router = express.Router();
const Cards = require('../models/cards')

router.get('/', Cards.getUsersCards)


module.exports = router