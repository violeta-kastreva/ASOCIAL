const express = require('express');
const router = express.Router();
const { updateFollowCounts, getAgentsByExperiment } = require('../controllers/agentController');

router.put('/follow', updateFollowCounts);
router.get('/experiment/:experimentId', getAgentsByExperiment);

module.exports = router; 