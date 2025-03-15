const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TimeStepPtr = sequelize.define('TimeStepPtr', {
        experiment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Primary Key
            allowNull: false,
        },
        timestepptr: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false, // No createdAt/updatedAt for this table
    });

    return TimeStepPtr;
};
