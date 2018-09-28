// websocket test
const socket = io.connect()

/**
 * @description 获取聊天室列表
 */
function getChatRoomsList() {
  socket.emit('room')
}

socket.on('nameResult', function(data) {
  console.log(data)
})

socket.on('rooms', function(data) {
  console.log('rooms', data)
})

getChatRoomsList()