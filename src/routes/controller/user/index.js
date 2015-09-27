function userIndex(req, res, next) {
    res.send('test');
}

exports.definition = [{
    'method': 'get',
    path: '/u/:user',
    'handler': userIndex
}];
