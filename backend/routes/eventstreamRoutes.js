const express = require('express');
const router = express.Router();
const { getEventStream } = require('../controllers/eventstreamController');

router.get('/:experimentId', getEventStream);

module.exports = router; 