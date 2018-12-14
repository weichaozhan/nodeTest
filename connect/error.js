const connect = require('connect');

const api = connect()
                .use(users)
                .use(pets)
                .use(errorHandler);

const app = connect()
                .use(hello)
                .use('/api', api)
                .use(errorPage)
                .listen(8080);

const db = {
    users: [
        {name: 'a'},
        {name: 'b'},
        {name: 'c'},
    ],
};

function hello(req, res, next) {
    if (req.url.match(/^\/hello/)) {
        if (req.method === 'POST') {            
            next(`
                <p>Can not be POST</p>
            `);
        } else {
            res.end('Hello World');
        }
    } else {
        next();
    }
}

function users(req, res, next) {
    const match = req.url.match(/^\/user\/(.+)/);

    if (match) {
        const user = db.users[match[1]];

        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            const err = new Error('User Not Found');
            
            err.notFount = true;
            next(err);
        }
    } else {
        next();
    }
}

function pets(req, res, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {
        foo();
    } else {
        next();
    }
}

function errorHandler(err, req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    if (err.notFount) {
        res.statusCode = 404
        res.end(JSON.stringify({
            error: err.message,
        }))
    } else {
        res.statusCode = 500
        res.end(JSON.stringify({
            error: 'Internal Server Error',
        }))
    }
}

function errorPage(err, req, res, next) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(err);
}