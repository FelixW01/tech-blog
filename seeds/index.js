const seedComments = require('./category-seeds');
const seedPosts = require('./product-seeds');
const seedUsers = require('./tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({
        force: true
    });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    process.exit(0);
};

seedAll();