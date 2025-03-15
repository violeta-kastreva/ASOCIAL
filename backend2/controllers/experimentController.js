const Experiment = require('../models/experimentModel');

const getExperiments = async (req, res) => {
    try {
        const experiments = await Experiment.find({ userId: req.query.userId });
        res.json(experiments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching experiments', error: error.message });
    }
};

const createExperiment = async (req, res) => {
    try {
        const experiment = await Experiment.create({
            ...req.body,
            progress: 0
        });
        res.status(201).json(experiment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating experiment', error: error.message });
    }
};

const deleteExperiment = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.params.id);
        
        if (!experiment) {
            return res.status(404).json({ message: 'Experiment not found' });
        }

        await experiment.deleteOne();
        res.json({ message: 'Experiment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting experiment', error: error.message });
    }
};

module.exports = {
    getExperiments,
    createExperiment,
    deleteExperiment
}; 