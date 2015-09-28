function userIndex(req, res, next) {
    res.send('test');
}

function signUp(req, res, next) {
    if (req.user) return res.redirect('/');

}

function login(req, res, next) {
    if (req.user) return res.redirect('/');
}

exports.definition = [{
    'method': 'get',
    path: '/u/:user',
    'handler': userIndex
}];
