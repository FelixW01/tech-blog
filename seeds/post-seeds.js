const {
    Post
} = require('../models');

const postData = [{
        title: 'POST 1',
        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        userId: 1,
    },
    {
        title: 'POST 2',
        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        userId: 1,
    },
    {
        title: 'POST 3',
        content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        userId: 1,
    },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;