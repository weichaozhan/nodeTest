const connect = require('connect');
const app = connect();

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}

app
    .use(logger)
    .use(hello)
    .listen(8080);