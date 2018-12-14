const connect = require('connect');
const chalk = require('chalk');
const app = connect();

/**
 * 可配置的 log 中间件
 */
function setUp(format) {
    const regexp = /:(\w+)/g;

    return function (req, res, next) {
        const str = format.replace(regexp, function(match, property) {
            return req[property];
        });
        console.log(str);
        next();
    };
}
/**
 * 路由 action
 */
function testAuth(req, res, next) {
    const method = req.method;
    const url = req.url;

    if (method !== 'GET') return next('Need Get Request');

    switch(url) {
        case '/doctor':
            res.end('come from /doctor');
            break;
        case '/pacient':
            res.end('comse from /pacient');
            break;
        default:
            res.end('come from  default');
            break;
    }
}
function hello(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}

app
    .use(setUp(':method :url'))
    .use('/hospital', testAuth)
    .use(hello)
    .listen(8080);