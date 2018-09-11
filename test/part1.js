// test1
let fs = require('fs')

fs.readFile('../package.json', function(er, data) {
    console.log('er:', er, '\n', 'data:', data)
})

// test2
let http = require('http')
let port = 3000

// http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World \n')
// }).listen(port)

let server = http.createServer()

server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World2 \n')
})
server.listen(port)
console.log(`server running at port ${port}`)