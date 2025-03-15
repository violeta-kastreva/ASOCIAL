// routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');

// Create
router.post('/', agentController.create);

// Read
router.get('/', agentController.getAll);
router.get('/:id', agentController.getById);

// Update
router.put('/:id', agentController.update);

// Delete
router.delete('/:id', agentController.delete);

module.exports = router;