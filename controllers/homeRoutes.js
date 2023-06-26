const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');


// router.get('/', async (req, res) => {
//     try {
//         //findAll posts from db
//         const postData = await Post.findAll({
//             attributes: ['id', 'title', 'content', 'created_at'],
//             include: [{
//                     model: Comment,
//                     attributes: ['id', 'comment', 'userId', 'postId', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['user_name'],
//                     },
//                 },
//                 {
//                     model: User,
//                     attributs: ['user_name'],
//                 },
//             ],
//         })
//         const posts = postData.map((post) => post.get({
//             plain: true
//         }))
//         console.log(posts)
//         res.render('homepage', {
//             posts,
//             logged_in: req.session.loggedIn
//         });
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err);
//     }
// });

router.get('/', (req, res) => {

    res.render('homepage');
});
//login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//signup
router.get('/signup', (req, res) => {
    res.render('signup')
});
module.exports = router