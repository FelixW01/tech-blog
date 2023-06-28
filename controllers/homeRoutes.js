const router = require('express').Router();
const sequelize = require('../config/connection');
const isAuth = require('../middleware/isAuthenticated')
const {
    User,
    Post,
    Comment
} = require('../models');

//findAll posts from db
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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
        //gets clean data
        const posts = postData.map((post) => post.get({
            plain: true
        }))
        // console.log(posts)
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userId: req.session.userId
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//find one post, include Comment, User
router.get('/post/:id', async (req, res) => {
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
            res.render('single-post', {
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
//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
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