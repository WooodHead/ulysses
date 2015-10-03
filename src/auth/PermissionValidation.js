

exports.isOwner = function (req, res, next) {

};

exports.hasPermission = function (req, res, next) {
// TODO:
};

exports.isAdmin = function (req, res, next) {
    if (req.user.isAdmin) {
        return next();
    } else {
        return res.redirect('/');
    }
};

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};
