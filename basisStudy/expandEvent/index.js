const events = require('events')
const util = require('util')
const fs = require('fs')

const watchDir = './watch'
const outputDir = './output'

/**
 * 监控类
 * @param {String} watchDir 
 * @param {String} outputDir 
 */
function Watcher(watchDir, outputDir) {
    this.watchDir = watchDir
    this.outputDir = outputDir
    // events.EventEmitter.call(this)
}
// Watcher.prototype = new events.EventEmitter()
util.inherits(Watcher, events.EventEmitter)
Watcher.prototype.watch = function() {
    const watcher = this
    
    fs.readdir(this.watchDir, function(err, files) {
        if (err) throw err
        for (let index in files) {
            watcher.emit('process', files[index])
        }
    })
}
Watcher.prototype.start = function() {
    const watcher = this

    fs.watch(watchDir, function() {
        console.log(watchDir)
        watcher.watch()
    })
}

// content
const watcher = new Watcher(watchDir, outputDir)

watcher.on('process', function(file) {
    const watchFile = `${this.watchDir}/${file}`
    const outputFile = `${this.outputDir}/${file.toLowerCase()}`

    fs.rename(watchFile, outputFile, function(err) {
        if (err) {
            throw err
        }
    })
})
watcher.start()