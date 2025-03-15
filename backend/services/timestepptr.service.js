const db = require('../models');
const TimeStepPtr = db['TimeStepPtr'];
const timeStepPtrService = {};

/**
 * Increments the timestepptr value for a given experiment.
 *
 * @async
 * @function incrementTimeStepPtr
 * @param {number} experiment_id - The ID of the experiment to increment the timestepptr for.
 * @returns {Promise<Object>} The updated TimeStepPtr object.
 * @throws error
 */
timeStepPtrService.incrementTimeStepPtr = async (experiment_id) => {
    try {
        const ptr = await TimeStepPtr.findOne({ where: { experiment_id } });

        if (!ptr) {
            throw new Error(`Experiment with ID ${experiment_id} not found.`);
        }

        ptr.timestepptr += 1;
        await ptr.save();

        return ptr;
    } catch (error) {
        throw error;
    }
};

/**
 * Decrements the timestepptr value for a given experiment.
 *
 * @async
 * @function decrementTimeStepPtr
 * @param {number} experiment_id - The ID of the experiment to decrement the timestepptr for.
 * @returns {Promise<Object>} The updated TimeStepPtr object.
 * @throws error
 */
timeStepPtrService.decrementTimeStepPtr = async (experiment_id) => {
    try {
        const ptr = await TimeStepPtr.findOne({ where: { experiment_id } });

        if (!ptr) {
            throw new Error(`Experiment with ID ${experiment_id} not found.`);
        }

        ptr.timestepptr -= 1;
        await ptr.save();

        return ptr;
    } catch (error) {
        throw error;
    }
};

module.exports = timeStepPtrService;
