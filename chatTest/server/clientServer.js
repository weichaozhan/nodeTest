const socketio = require('socket.io')

let io
let guestNumber = 1
let nickName = {}
let nameUsed = []
let currentRoom = {}

/**
 * @description 分配用户昵称
 */
function assignGuestName(socket, guestNumber, nickName, nameUsed) {
  let name = 'Guest' + guestNumber

  nickName[socket.id] = name
  // 告知用户昵称
  socket.emit('nameResult', {
    success: true,
    name: name
  })
  // 已占用昵称
  nameUsed.push(name)

  // 计数器增加
  return guestNumber + 1
}

exports.listen = function(server) {
  io = socketio.listen(server)
  io.set('log level', 1)
  
  io.sockets.on('connection', function(socket) {
    guestNumber = assignGuestName(socket, guestNumber, nickName, nameUsed)
    
    // 用户连接时进入默认房间
    joinRoom(socket, 'Public')
    // 用户信息
    handleMassageBroadCasting(socket, nickName)
    // 处理更名
    handleNameChangeAttempts(socket, nickName, nameUsed)
    // 房间创建和变更
    handleRoomJoining(socket)
  
    // 处理聊天室列表获取请求
    socket.on('room', function() {
      socket.emit('rooms', io.sockets.manager.rooms)
    })

    // 用户断开连接处理逻辑
    handleClientDisconnection(socket, nickName, nameUsed)
  })
}