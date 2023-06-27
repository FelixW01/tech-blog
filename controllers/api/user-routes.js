const router = require('express').Router();
const {
    User,
} = require('../../models');

//signup user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.userId;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json('Account created.')
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

});
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({
                message: 'Invalid username!'
            });
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect password!'
            });
            return;
        }
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json({
                message: 'You are logged in!'
            });
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;