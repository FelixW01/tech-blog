const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../../models');
const isAuth = require('../../middleware/isAuthenticated')

//creates new post
router.post('/', isAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId
        });
        console.log('Post successfully created');
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
});

//Updates post
router.put('/:id', isAuth, async (req, res) => {
    try {
        const postUpdate = await Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            },
        });
        if (!postUpdate) {
            res.status(404).json({
                message: 'Invalid post id!'
            });
            return;
        }
        res.status(200).json(postUpdate)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

})

//Deletes post
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });
        if (!postData) {
            res.status(404).json({
                message: 'invalid user id!'
            });
            return;
        }
        console.log('Post has been deleted')
        res.status(200).json(postData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});
module.exports = router;