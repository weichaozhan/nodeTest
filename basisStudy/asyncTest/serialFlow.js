// 串行流程控制
const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

function checkForRSSFile() {
    fs.exists(configFilename, function(exists) {
        if (!exists) {
            next(new Error(`Missing RSS File: ${configFilename}`));
        } else {
            next(null, configFilename);
        }
    });
}

function readRSSFile(configFilename) {
    fs.readFile(configFilename, function(err, data) {
        if (err) {
            next(err);
        } else {
            const feed = data.toString().replace(/\r/g, '').split('\n');

            next(null, feed[1]);
        }
    });
}

function downloadRSSFeed(feedURL) {
    console.log('feedURL', feedURL)
    request({
        uri: feedURL,
    }, function(err, res, body) {
        if (err) {
            next(err);
        } else if (res.statusCode !== 200) {
            next(new Error('Abnormal status code'));
        } else {
            next(null, body);
        }
    })
}

function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    
    parser.parseComplete(rss);
    if (!handler.dom) {
        next(new Error('No RSS items Found'))
    } else {
        const dom = handler.dom;
        
        for (let index in dom) {
            console.log(index, dom[index])
        }
    }
}

const tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];

function next(err, result) {
    
    if (err) {
        throw err;
    } else {
        const currentTask = tasks.shift();

        if (currentTask) {
            currentTask(result);
        }
    }
}

next();