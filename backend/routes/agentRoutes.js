const express = require('express');
const router = express.Router();
const { updateFollowCounts } = require('../controllers/agentController');

router.put('/follow', updateFollowCounts);

module.exports = router; 