const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../models');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                    model: Comment,
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
            order: [
                ['created_at', 'DESC']
            ],
        });
        cleanPostData = postData.map((post) => post.get({
            plain: true
        }))
        res.render('homepage', {
            cleanPostData,
            logged_in: req.session.logged_in,
            username: req.session.username,
            userId: req.session.userId
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router