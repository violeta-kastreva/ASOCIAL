const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const EventStream = sequelize.define('EventStream', {
        experiment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // Part of composite key
        },
        timestep: {
            type: DataTypes.INTEGER, // Could be DataTypes.DATE if using timestamps
            allowNull: false,
            primaryKey: true, // Part of composite key
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, // Part of composite key
            allowNull: false,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        followee_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['experiment_id', 'timestep'], // Optimized sorting
            }
        ]
    });

    return EventStream;
};
