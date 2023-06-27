const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');
// const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', (req, res) => {
    res.render('dashboard');
});




module.exports = router