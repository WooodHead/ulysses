const cheerio = require('cheerio');

exports.extractCsrf = function extractCsrf(text) {
    const loaded = cheerio.load(text);
    return loaded('[name=_csrf]').val();
};


exports.buildCookie = function buildCookie(cookies) {
    return cookies.map(function (cookie) {
        return cookie.replace("; path=/; httponly", "");
    }).join("; ");
};
