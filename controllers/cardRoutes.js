const express = require('express');
const router = express.Router();
const Cards = require('../models/cards')

router.get('/', Cards.getUsersCards)
router.post('/', Cards.receviedCard)
router.put('/', Cards.updateCardInAlbum)
router.delete('/', Cards.deleteCardFromAlbum)

module.exports = router