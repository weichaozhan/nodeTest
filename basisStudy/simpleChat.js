
/**
 * 简易聊天室
 */
const events = require('events')
const net = require('net')
const channel = new events.EventEmitter()

channel.clients = {}
channel.subscriptions = {}

// 最大监听数目
channel.setMaxListeners(5)

channel.on('join', function(id, client) {
    this.clients[id] = client
    this.subscriptions[id] = function(senderId, message) {
        if (id !== senderId) {
            this.clients[id].write(message)
        }
    }
    this.on('broadcast', this.subscriptions[id])
    console.log('当前连接数：', this.listeners('broadcast').length, '\n')
})

channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id])
    this.emit('broadcast', id, `${id} is leaved.\n`)
    
    // 删除对应事件
    delete this.subscriptions[id]
    console.log('当前连接数：', this.listeners('broadcast').length, '\n')
    // 所有连接断开关闭服务
    if (Object.keys(this.subscriptions).length === 0) {
        server.close()
    }
})

const server = net.createServer((client) => {
    const id = `${client.remoteAddress}:${client.remotePort}`

    client.on('data', (data) => {
        const newData = data.toString()
        channel.emit('broadcast', id, newData)
    })
    // socket 关闭触发
    client.on('close', () => {
        console.log(id)
        channel.emit('leave', id)
    })
})

// 新连接建立成功
server.on('connection', (client) => {
    const id = `${client.remoteAddress}:${client.remotePort}`

    channel.emit('join', id, client)
})
// server 关闭 --> 所有连接断开
server.on('close', () => {
    console.log('Server Closed')
})
server.listen(8888)
