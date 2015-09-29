const Express = require('express');
const router = Express.Router();

router.get('/', function (req, res) {
    res.render('index', {title: 'Ulysses'});
});

exports.router = router;
