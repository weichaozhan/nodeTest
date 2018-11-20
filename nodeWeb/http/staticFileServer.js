const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;

http.createServer(function(req, res) {
    const url = parse(req.url);
    const path = join(root, 'file/' + url.pathname);
    // const stream = fs.createReadStream(path);
    
    // step1
    /**
     * res.setHeader('Content-Type', 'text/html');
     * stream.on('data', function(chunk) {
     *   res.write(chunk);
     * })
     * stream.on('end', function() {
     *  res.end()
     * });
     */
    // strp2
    /**
     * // 管道
     * stream.pipe(res);
     * // 错误处理
     * stream.on('error', function(err) {
     *   res.statusCode = 500;
     *   res.end('Internal Server Error!');
     * });
     */
    
    // step3
    fs.stat(path, function(err, stat) {
        console.log(err, '\n', stat)
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error!');
            }
        } else {
            const stream = fs.createReadStream(path);

            res.setHeader('Content-Length', stat.size);
            stream.pipe(res);
            stream.on('error', function(err) {
                res.statusCode = 500;
                res.end('Internal Server Error!');
            });
        }
    });
}).listen(80);