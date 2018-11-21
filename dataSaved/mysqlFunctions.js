/**
 * 数据存储--MySQL--功能模块
 * @author weichaozhan
 */
const qs = require('querystring');

exports.sendHtml = function(res, childHtml) {
    const html = `
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>mysql</title>
            </head>
            <body>
                ${childHtml}
            </body>
        </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

exports.parseRecievedData = function(req, cb) {
    let body = '';

    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        body += chunk;
    })
    req.on('end', function() {
        const data = qs.parse(body);

        cb(data);
    })
}

exports.actionForm = function(id, path, label) {
    const html = `
        <form method="POST" action="${path}">
            <input type="hidden" name="id" value="${id}" />
            <input type="submit" value="${label}" />
        </form>
    `;
    return html;
}

/**
 * 添加工作记录
 */
exports.add = function(db, req, res) {
    exports.parseRecievedData(req, function(work) {
        db.query(`
        INSERT INTO work(hours, date, desciption)
        VALUES(?,?,?)
        `,
        [work.hours, work.date, work.desciption],
        function(err) {
            if (err) {
                throw err;
            } else {
                exports.show(db, res);
            }
        });
    });
}

/**
 * 删除工作记录
 */
exports.delete = function(db, req, res) {
    exports.parseRecievedData(req, function(work) {
        db.query(`
            DELETE FROM work WHERE id=?
        `,
        [work.id],
        function(err) {
            if (err) {
                throw err;
            } else {
                exports.show(db, res);
            }
        });
    })
}

/**
 * 归档工作记录
 */
exports.archive = function(db, req, res) {
    console.log('archive')
    exports.parseRecievedData(req, function(work) {
        db.query(`
            UPDATE work SET archived=1 WHERE id=?
        `,
        [work.id],
        function(err) {
            if (err) {
                throw err;
            } else {
                exports.show(db, res);
            }
        });
    });
}

/**
 * 获取工作记录
 */
exports.show = function(db, res, showArchived) {
    let archivedValue = showArchived ? 1 : 0;
    let query = `
        SELECT * FROM work
        WHERE archived=?
        ORDER BY date DESC
    `;

    /**
     * rows 返回查询的结果
     */
    db.query(query, [archivedValue], function(err, rows) {
        if (err) {
            throw err;
        } else {
            let html = showArchived ? '' : `<a href="/archived">Archived Work</a><br/>`;

            html += exports.workHitListHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        }
    });
}
exports.showArchived = function(db, res) {
    exports.show(db, res, true);
}

/**
 * html 表格
 */
exports.workHitListHtml = function(rows) {
    const html = `
        <table>
            ${
                rows.map(item => {
                    return `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.date}</td>
                            <td>${item.desciption}</td>
                            ${
                                item.archived ? '' : `<td>${exports.workArchiedForm(item.id)}</td>`
                            }
                            <td></td>
                            <td>
                                ${
                                    exports.workDeleteForm(item.id)
                                }
                            </td>
                        </tr>
                    `;
                })
            }
        </table>
    `;
    return html;
}

/**
 * html 表单
 */
exports.workFormHtml = function() {
    const html = `
        <form method="POST" action="/">
            <p>
                Date(YYYY-MM-DD):
                <input name="date" type="text" />
            </p>
            <p>
                Hours(xxxx.xx): 
                <input name="hours" type="text"/>
            </p>
            <p>
                Description:
                <input name="desciption" type="text"/>
            </p>
            <input type="submit" value="添加"/>
        </form>
    `;
    return html;
}

/**
 * 归档表单
 */
exports.workArchiedForm = function(id) {
    return exports.actionForm(id, '/archive', '归档');
}

/**
 * 删除表单
 */
exports.workDeleteForm = function(id) {
    return exports.actionForm(id, '/delete', '删除');
}