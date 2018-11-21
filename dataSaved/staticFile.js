/**
 * 基于文件存储
 * @author weichaozhan
 */

const http = require('http');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), '/.tasks');

let items = [];

/**
* 初始化数据
 */
function initItems(cb) {
    fs.access(file, function(err) {
        if (err) {
            fs.writeFile(file, JSON.stringify(items), 'utf8', function(err) {
                if (err) {
                    res.end('写入失败');
                    throw err;
                } else {
                    cb();
                }
            })
        } else {
            fs.readFile(file, function(err, data) {
                if (err) {
                    throw err;
                } else {
                    const itemsData = data.toString();
                    
                    items = JSON.parse(itemsData);
                    cb();
                }
            })
        }
    })
}

function show(res) {
    const html = `
        <html>
            <head>
                <title>表单提交</title>
                <meta charset="utf-8" />
            </head>
            <body>
                ${
                    items.map(item => {
                        return `<li>${item}</li>`;
                    }).join('')
                }
                <form method="post" action="/">
                    <label>
                        输入：
                        <input type="text" name="text" />
                    </labe>
                    <input type="submit" value="Add Item" />
                </form>
            </body>
        </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}
function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}
function badRequest(res) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Bad Request');
}
function add(req, res) {
    let body = '';

    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        body += chunk;
    })
    req.on('end', function() {
        const obj = qs.parse(body);
        
        items.push(obj.text);
        fs.writeFile(file, JSON.stringify(items), 'utf8', function(err) {
            if (err) {
                res.end('写入失败');
                throw err;
            } else {
                show(res);
            }
        })
    })
}

http.createServer(function(req, res) {
    if (req.url === '/') {
        initItems(() => {
            switch(req.method) {
                case 'GET': 
                    show(res);
                    break;
                case 'POST':
                    add(req, res);
                    break;
                default:
                    badRequest(res);
                    break;
            }
        });
    } else {
        notFound(res);
    }
}).listen(80);