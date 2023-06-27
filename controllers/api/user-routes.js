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
//login user
// router.post('/login', (req, res) => {
//     User.findOne({
//         where: {
//             username: req.body.username
//         }
//     }).then(userData => {
//         if (!userData) {
//             res.status(400).json({
//                 message: 'Incorrect password!'
//             });
//             return;
//         }
//         req.session.save(() => {
//             req.session.userId = userData.id;
//             req.session.username = userData.username;
//             req.session.loggedIn = true;
//             res.json({
//                 user: userData,
//                 message: 'You are logged in!'
//             });
//         });
//     });
// });

module.exports = router;