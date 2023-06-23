const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    }
    return res.redirect('/')
}

Model.exports = isAuthenticated;