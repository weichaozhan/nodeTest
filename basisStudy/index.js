const firstModule = require('./firstModule')

console.log(firstModule.first)
console.log(firstModule.second)

const http =require('http')
const fs = require('fs')

/**
 * 事件
 */
// echo 服务
 const net = require('net')

const server = net.createServer((socket) => {
    socket.once('data', (data) => {
        socket.write('data')
    })
    socket.on('data', () => {
        socket.write('server')
    })
})

server.listen(8888)

// 自定义事件
const EventEmitter = require('events').EventEmitter
const channel = new EventEmitter()

channel.on('join', () => {
    console.log('welcome')
})

setTimeout(() => {
    channel.emit('join')
}, 1000)