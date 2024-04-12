const express = require('express');
const router = express.Router();

const fetchHoldings = require('../controllers/api/fetchHoldings');
const sellOrder = require('../controllers/api/sellOrder');
const placeOrder = require('../controllers/api/placeOrder');
const getData = require('../controllers/api/getData');

router.get('/fetchHoldings', fetchHoldings);
router.post('/placeOrder', placeOrder);
router.post('/sellorder', sellOrder);
router.get('/getData', getData);
module.exports = router;
