/**
 * 回调
 */
http.createServer((req, res) => {
    if (req.url === '/') {
        function handleError(err, res) {
            console.log(err)
            res.end('Server Error')
        }
        function getTitles() {
            fs.readFile('./data.json', (err, data) => {
                if (err) {
                    handleError(err, res)
                } else {
                    const posters = JSON.parse(data.toString());
                    
                    getHtml(posters)
                }
            })
        }
        function getHtml(posters) {
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    handleError(err, res)
                } else {
                    const html = data.toString()
                    const temp = html.replace('%', posters.join('</li><li>'))

                    res.writeHead(200, 'Content-Type', 'text/html')
                    res.end(temp)
                }
            })
        }

        getTitles()
    }
}).listen(8000, 'localhost')