const router = require('express').Router();
const sequelize = require('../config/connection');
const isAuth = require('../middleware/isAuthenticated')
const {
    User,
    Post,
    Comment
} = require('../models');

router.get('/', isAuth, (req, res) => {
    //findAll posts from db
    Post.findAll({
            where: {
                userId: req.session.userId,
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'userId', 'postId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributs: ['username'],
                },
            ],
        })
        .then((postData) => {
            const posts = postData.map((post) => post.get({
                plain: true
            }));
            console.log(posts)
            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        });
});

//find one post for editting
router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        if (postData) {
            //gets clean data
            const post = postData.get({
                plain: true
            });
            console.log(post);
            res.render('edit-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
            })
        } else {
            res.status(404).json({
                message: 'Invalid post id'
            })
            return;
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
//Create new posts
router.get('/new', isAuth, (req, res) => {
    res.render('new-post', {
        username: req.session.username,
        loggedIn: req.session.loggedIn,
    });
})

module.exports = router