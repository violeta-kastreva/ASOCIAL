const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        dislikeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        timestamps: false
    });

    Post.associate = (db) => {
        Post.belongsTo(db['Agent'], { foreignKey: 'agentId', onDelete: 'CASCADE' });
        Post.hasOne(db['Comment'], { foreignKey: 'postId', onDelete: 'CASCADE' });
    };

    return Post;
};