const eventStreamService = require("../services/eventstream.service");
const eventStreamController = {};


// stream/event/send
eventStreamController.storeAndApplyEvent = async (req, res) => {
    const { experiment_id, timestep, id, type, user_id, post_id, content, image, follower_id, followee_id } = req.body;
    try {
        const storedEvent = await eventStreamService.storeEvent({ experiment_id, timestep, id, type, user_id, post_id, content, image, follower_id, followee_id });
        await eventStreamService.applyEvent(storedEvent);
        res.status(201).json({
            message: 'Event stored and applied successfully.',
            event: storedEvent
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = eventStreamController;

