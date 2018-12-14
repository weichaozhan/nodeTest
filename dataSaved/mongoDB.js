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
const Task = mongoose.model('Task', tasks);

// 使用模型
(async function() {
    for (let i = 0; i < 6; i ++) {
        const task = new Task();
    
        task.project = `测试项目${i}`;
        task.description = `测试描述${Date.now()}`;
        await new Promise((res, rej) => {
            task.save((err) => {
                if (err) throw err;
                console.log('task saved');
                res();
            });
        });
    }
    Task.find({project: '测试项目0'}, (err, data) => {
        if (err) throw err;
        
        // 修改
        Task.update(
            {_id: data[data.length - 1]._id},
            {description: '我是修改后的信息'},
            {},
            (err) => {
                if (err) throw err;
                console.log('updated');

                console.log('remove:', data[0]);
                // 删除
                data[0].remove();
            }
        )   
    })
})();
