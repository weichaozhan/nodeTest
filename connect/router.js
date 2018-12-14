/**
 * @author weichaozhan
 * @description 构建路由中间件
 */
const connect = require('connect');
const router = require('./middlewarre/router');

const routes = {
    'GET': {
        '/users': function(req, res) {
            res.end('zhang', 'da', 'wei');
        },
        'user/:id': function(req, res, id) {
            res.end('user: ' + id);
        },
    },
    'DELETE': {
        'user/:id': function(req, res, id) {
            res.end('delete user: ' + id);
        }
    },
};

connect()
    .use(router(routes))
    .listen(8080);