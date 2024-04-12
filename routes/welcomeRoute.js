const express = require('express');
const router = express.Router();

const welcomeController = require('../controllers/api/welcome');

router.get('/welcome', welcomeController);

module.exports = router;
