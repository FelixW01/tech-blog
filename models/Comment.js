const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //references user.id as foreign key
        references: {
            model: 'user',
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        //references post.id as foreign key
        references: {
            model: 'post',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment;