// test1
let fs = require('fs')

// 读取文件
// fs.readFile('../package.json', function(er, data) {
//     console.log('er:', er, '\n', 'data:', data)
// })

/**
 * 数据流
 */
let stream = fs.createReadStream('./testFile.json')

stream.on('data', function (chunk) {
    console.log('Stream Chunk:', chunk, '\n')
})
stream.on('end', function() {
    console.log('Stream End')
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
    // res.writeHead(200, { 'Content-Type': 'text/plain' })
    // res.end('Hello World2 \n')
    res.writeHead('200', {'Content-Type': 'application/json'})
    fs.createReadStream('./testFile.json').pipe(res) // 读取流到写出流的管道
})
server.listen(port)
console.log(`server running at port ${port}`)