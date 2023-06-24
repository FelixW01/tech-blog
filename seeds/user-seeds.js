const {
    User
} = require('../models');

const userData = [{
        userName: 'Felix',
        password: 'password123',
    },
    {
        userName: 'Jillian',
        password: 'password321',
    },
    {
        userName: 'Lili',
        password: 'password244',
    },

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;