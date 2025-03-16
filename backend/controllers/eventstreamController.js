const Eventstream = require('../models/eventstreamModel');

const getEventStream = async (req, res) => {
    try {
        const { experimentId } = req.params;
        const events = await Eventstream.find({ experimentId })
            .sort({ timeStep: 1 });
        
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event stream', error: error.message });
    }
};

module.exports = {
    getEventStream
}; 