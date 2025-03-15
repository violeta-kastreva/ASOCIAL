const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Experiment = sequelize.define('Experiment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    Experiment.associate = (db) => {
        Experiment.belongsTo(db['User'], { foreignKey: 'userId', onDelete: 'CASCADE' });
        Experiment.hasMany(db['Agent'], { foreignKey: 'experimentId', onDelete: 'CASCADE' });
    };

    return Experiment;
};