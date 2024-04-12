const express = require('express');
const router = express.Router();

const logout = require('../controllers/api/logout');

router.post('/logout', logout);

module.exports = router;
