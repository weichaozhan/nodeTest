const parse = require('url').parse;

module.exports = function route(obj) {
    return function(req, res, next) {
        if (!obj[req.method]) {
            return next();
        }

        const routes = obj[req.method];
        const url = parse(req.url);
        const paths = Object.keys(routes);

        for (let i = 0; i < paths.length; i ++) {
            let path = paths[i];
            const fn = routes[path];

            path = path
                        .replace(/\//g, '/')
                        .replace(/:(\w+)/g, '([^\\/]+)');
            console.log('path', path);
            const regexp = new RegExp(path);
            console.log('regexp', regexp);
            const captures = url.pathname.match(regexp);
            console.log('url.pathname', url.pathname);
            console.log('captures', captures);
            console.log('\n\n\n\n\n');

            if (captures) {
                const args = [req, res].concat(captures.slice(1));
                fn.apply(null, args);
                return;
            }
        }
        next();
    };
};