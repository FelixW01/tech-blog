const {
    Comment
} = require('../models');

const commentData = [{
        comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        userId: 1,
        postId: 1,
    },
    {
        comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        userId: 2,
        postId: 1,
    },
    {
        comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        userId: 3,
        postId: 1,
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;