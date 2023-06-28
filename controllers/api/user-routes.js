const router = require('express').Router();
const {
    User,
} = require('../../models');
const isAuth = require('../../middleware/isAuthenticated')
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

//login user
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

//logout user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;