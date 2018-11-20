const http = require('http');
const url = require('url');

const items = [];
const server = http.createServer(function(req, res) {
    switch(req.method) {
        case 'POST': 
            let item = '';

            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                item += chunk;
            });
            req.on('end', () => {
                items.push(item);
                res.statusCode = 200;
                res.end('OK\n');
            })
            break;
        case 'GET':
            res.end(items.join(';'));
            break;
        case 'DELETE':
            let pathnameArr = url.parse(req.url).pathname.split('/');
            let id = parseInt(pathnameArr[pathnameArr.length - 1], 10);

            if (isNaN(id)) {
                res.statusCode = 400;
                res.end('ID必须是数字')
            } else if(!items[id]) {
                res.statusCode = 404;
                res.end('没有对应的内容');
            } else {
                items.splice(id, 1);

                res.statusCode = 200;
                res.end('删除成功\n');
            }
            break;
    }    
});

server.listen(80);