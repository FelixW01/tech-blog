const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../../models');
const isAuth = require('../../middleware/isAuthenticated')

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



module.exports = router;