/**
 * 数据存储--MySQL
 * @author weichaozhan
 */
const http = require('http');
const work = require('./mysqlFunctions');
const url = require('url');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'weichaozhan',
    database: 'testDataBase',
    insecureAuth: true,
});
const server = http.createServer(function(req, res) {
    switch(req.method) {
        case 'POST':
            const urlPath = url.parse(req.url).pathname.toString();
            switch(urlPath) {
                case '/': 
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res); 
                    break;
                case '/delete':
                    work.delete(db, req, res);
                    break;
            }  
            break;
        case 'GET':
            switch(req.url) {
                case '/':
                    work.show(db, res, false);
                    break;
                case '/archived':
                    work.showArchived(db, res);
                    break;
            }
            break;
    }
});

db.query(`
    CREATE TABLE IF NOT EXISTS work(
        id INT(10) NOT NULL AUTO_INCREMENT,
        hours DECIMAL(5,2) DEFAULT 0,
        date DATE,
        archived INT(1) DEFAULT 0,
        desciption LONGTEXT,
        PRIMARY KEY(id)
    )
`, function(err) {
    if (err) {
        throw err;
    } else {
        const port = 8080;

        console.log(`Server listening ${port}`);
        server.listen(port);
    }
});