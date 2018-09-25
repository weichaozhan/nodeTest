const socketio = require('socket.io')

let io
let guestNumber = 1
// 保存名称
let nickName = {}
// 保存已占用昵称
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

/**
 * @description 进入聊天室
 */
function joinRoom(socket, room) {
  // 进入房间
  socket.join(room)
  // 记录当前房间
  currentRoom[socket.id] = room
  // 告知用户所进入房间的信息
  socket.emit('joinResult', {
    room: room
  })
  // 告知当前房间其他用户有新用户进入房间
  socket.broadcast.to(room).emit('message', {
    text: `${nickName[socket.id]} 加入房间 ${room}。`
  })

  // 当前房间的用户
  let usersInRoom = io.sockets.clients(room)

  // 如果当前房间的用户不止一个，汇总用户信息
  if (usersInRoom.length > 1) {
    let usersRoomSummary = `当前 ${room} 房间的用户有：`
    
    for (let index in usersInRoom) {
      let userSocketId = usersInRoom[index].id

      // id 不为当前用户的 id
      if (userSocketId !== socket.id) {
        if (index > 0) {
          usersRoomSummary += '，'
        }

        usersRoomSummary += nickName[userSocketId]
      }
    }

    usersRoomSummary += '。'

    // 告知当前用户房间内其他用户的信息
    socket.emit('message', {
      text: usersRoomSummary
    })
  }
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