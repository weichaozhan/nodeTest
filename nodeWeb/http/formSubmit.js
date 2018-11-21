// const http = require('http');
const https = require('https');
const qs = require('querystring');
const formidable = require('formidable');
const fs = require('fs');

const items = [];
// https 配置
const options = {
    key: fs.readFileSync('./weichaozhan.pem'),
    cert: fs.readFileSync('./weichaozhan-cert.pem'),
};

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
                <form method="post" action="/" enctype="multipart/form-data">
                    <label>
                        输入：
                        <input type="text" name="text" />
                    </labe>
                    <label>
                        上传：
                        <input type="file" name="file" />
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
        show(res);
    })
}
function isFormData(req) {
    const type = req.headers['content-type'] || '';
    return 0 === type.indexOf('multipart/form-data');
}
function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request');
    } else {
        const form  = new formidable.IncomingForm();
        
        form.uploadDir = "./file";
        form.keepExtensions = true;
        // form.on('field', function(field, value) {
        //     console.log(field, value);
        // });
        // form.on('file', function(name, file) {
        //     console.log(name, file);
        // })
        form.on('end', function() {
            res.end('Upload Complete');
        });
        form.on('progress', function(byteRecieve, byteExcepted) {
            const percent = Math.floor(byteRecieve / byteExcepted * 100);
            console.log(percent);
        });
        form.parse(req, function(err, fields, files) {
            console.log(fields);
        });
    }
}

https.createServer(options, function(req, res) {
    if (req.url === '/') {
        switch(req.method) {
            case 'GET': 
                show(res);
                break;
            case 'POST':
                upload(req, res);
                break;
            default:
                badRequest(res);
                break;
        }
    } else {
        notFound(res);
    }
}).listen(80);