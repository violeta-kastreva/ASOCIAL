const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    Comment.associate = (db) => {
        Comment.belongsTo(db['Agent'], { foreignKey: 'agentId', onDelete: 'CASCADE' });
        Comment.belongsTo(db['Post'], { foreignKey: 'postId', onDelete: 'CASCADE' });
    };

    return Comment;
};