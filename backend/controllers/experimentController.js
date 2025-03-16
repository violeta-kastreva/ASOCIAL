const Experiment = require('../models/experimentModel');
const Agent = require('../models/agentModel');
const mongoose = require('mongoose');

const getExperiments = async (req, res) => {
    try {
        const experiments = await Experiment.find({ userId: req.query.userId })
            .populate('agents');
        res.json(experiments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching experiments', error: error.message });
    }
};

const createExperiment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { title, description, agents, userId } = req.body;

        const experiment = await Experiment.create([{
            title,
            description,
            progress: 0,
            userId
        }], { session });

        if (agents && agents.length > 0) {
            const agentsWithExperimentId = agents.map(agent => ({
                ...agent,
                experimentId: experiment[0]._id
            }));
            await Agent.create(agentsWithExperimentId, { session });
        }

        await session.commitTransaction();
        
        const completeExperiment = await Experiment.findById(experiment[0]._id)
            .populate('agents');
            
        res.status(201).json(completeExperiment);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: 'Error creating experiment', error: error.message });
    } finally {
        session.endSession();
    }
};

const deleteExperiment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const experiment = await Experiment.findById(req.params.id);
        
        if (!experiment) {
            return res.status(404).json({ message: 'Experiment not found' });
        }

        await Agent.deleteMany({ experimentId: experiment._id }, { session });
        
        await experiment.deleteOne({ session });

        await session.commitTransaction();
        res.json({ message: 'Experiment and associated agents deleted successfully' });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: 'Error deleting experiment', error: error.message });
    } finally {
        session.endSession();
    }
};

module.exports = {
    getExperiments,
    createExperiment,
    deleteExperiment
}; 