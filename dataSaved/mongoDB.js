const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testMongo', { useNewUrlParser: true }, (err) => {
    if(err){
        console.log("数据库连接失败！");
    }else{
        console.log("数据库连接成功！");
    }
});

// 建立模型
const Schema = mongoose.Schema;
const tasks = new Schema({
    project: String,
    description: String,
});
mongoose.model('Task', tasks);

// 使用模型
const Task = mongoose.model('Task');

for (let i = 0; i < 6; i ++) {
    const task = new Task();

    task.project = `测试项目${i}`;
    task.description = `测试描述${Date.now()}`;
    task.save((err) => {
        if (err) throw err;
        console.log('task saved');
    });
}

setTimeout(() => {
    Task.find({description: '测试描述1544693672056'}, (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}, 1500)