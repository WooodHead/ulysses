exports.definition = [{
    'method': 'get',
    path: '/',
    'handler':  function(req, res){
        res.render('index', {title: 'Ulysses'});
    }
}];
