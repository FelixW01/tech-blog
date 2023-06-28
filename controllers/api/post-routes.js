const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../../models');
const isAuth = require('../../middleware/isAuthenticated')

router.post('/', isAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId
        })
        console.log('Post successfully created');
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;