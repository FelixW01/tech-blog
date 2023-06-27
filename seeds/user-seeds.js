const {
    User
} = require('../models');

const userData = [{
        username: 'Felix',
        password: 'password123',
    },
    {
        username: 'Jillian',
        password: 'password321',
    },
    {
        username: 'Lili',
        password: 'password244',
    },

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;