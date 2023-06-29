const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../../models');
const isAuth = require('../../middleware/isAuthenticated')

//create comment
router.post('/', isAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                comment: req.body.comment,
                postId: req.body.postId,
                userId: req.session.userId,
            })
            .then(commentData => res.json(commentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
})

//get 1 comment by id
router.put('/:id', isAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id
            },
        });
        if (commentData.length === 0) {
            res.status(404).json({
                message: 'Invalid comment id!'
            });
            return;
        }
        res.status(200).json(commentData)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

})

//Deletes comment
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            },
        });
        if (!commentData) {
            res.status(404).json({
                message: 'invalid comment id!'
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