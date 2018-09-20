const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

let cache = {}

// 辅助函数

/**
 * @description 404 处理
 */
function send404(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  })
  response.write('Error 404: resource not found.')
  response.end()
}

/**
 * @description 文件数据
 */
function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {
    'Content-Type': mime.getType(path.basename(filePath))
  })
  response.end(fileContents)
}

/**
 * @description 静态文件服务
 */
function serveStatic(response, cache, absPath) {
  // if (cache[absPath]) {
  //   // 从内存中返回文件
  //   sendFile(response, absPath, cache[absPath])
  // } else {
  //   fs.exists(absPath, function (exists) {
  //     // 检查 文件是否存在
  //     if (exists) {
  //       fs.readFile(absPath, function (err, data) {
  //         if (err) {
  //           send404(response)
  //         } else {
  //           cache[absPath] = data
  //           sendFile(response, absPath, data)
  //         }
  //       })
  //     } else {
  //       send404(response)
  //     }
  //   })
  // }
  fs.exists(absPath, function (exists) {
    // 检查 文件是否存在
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          cache[absPath] = data
          sendFile(response, absPath, data)
        }
      })
    } else {
      send404(response)
    }
  })
}

// 创建服务
const server = http.createServer(function(request, response) {
  let filePath = false

  if (request.url === '/') {
    filePath = './client/index.html'
  } else {
    filePath = 'client' + request.url
  }

  let absPath = './' + filePath

  serveStatic(response, cache, absPath)
})

// 聊天服务
const chatServer = require('./server/clientServer')

chatServer.listen(server)

server.listen(3000, function () {
  console.log('Server listening on port 3000')
})