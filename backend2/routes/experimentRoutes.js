const express = require('express');
const router = express.Router();
const { getExperiments, createExperiment, deleteExperiment } = require('../controllers/experimentController');

router.get('/', getExperiments);
router.post('/', createExperiment);
router.delete('/:id', deleteExperiment);

module.exports = router; 