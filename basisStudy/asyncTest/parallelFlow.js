// 并行流程控制
const fs = require('fs');
const tasks = [];
const wordCounts = {};
const fileDir = './text';

let completeTasks = 0;

/**
 * 所有任务完成，列出文件中的每个单词及用了多少次
 */
function checkIfComplete() {
    completeTasks ++;
    if (completeTasks === tasks.length) {
        // 排序
        const arr = [];
        
        for (let index in wordCounts) {
            arr.push([
                [index], wordCounts[index],
            ]);
        }
        arr.sort((pre, aft) => {
            return aft[1] - pre[1];
        })
        for (let index in arr) {
            console.log(arr[index][0] + ':' + arr[index][1]);
        }
    }
}

/**
 * 单词计数
 */
function countWordsInText(text) {
    const words = text.toString().toLowerCase().split(/\W+/);

    for (let index in words) {
        const word = words[index];

        if (word) {
            wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
        }
    }
}

fs.readdir(fileDir, function(err, files) {
    if (err) {
        throw err;
    } else {
        for (let index in files) {
            const task = (function(file) {
                return function() {
                    fs.readFile(file, function(err, file) {
                        if (err) {
                            throw err;
                        } else {
                            countWordsInText(file);
                            checkIfComplete();
                        }
                    })
                }
            })(`${fileDir}/${files[index]}`);

            tasks.push(task);
        }

        for (let task in tasks) {
            tasks[task]();
        }
    }
});