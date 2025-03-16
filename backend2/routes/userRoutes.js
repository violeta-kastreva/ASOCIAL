const express = require('express');
const router = express.Router();
const { updateFollowCounts } = require('../controllers/agentController');

router.put('/agents/follow', updateFollowCounts);

module.exports = router; 