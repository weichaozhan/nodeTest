const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

client.on('error', function(err) {
    console.log('Error', err);
});
// 键值对
client.set('color', 'red', redis.print)
client.get('color', function(err, value) {
    if (err) throw err;
    console.log('Got:' + value);
});

// 哈希表
// client.hmset('camping', {
//     'climbing': 'climb',
//     'cooking': 'campstove'
// }, redis.print);
client.hmget('camping', 'cooking', function(err, value) {
    if (err) throw err;
    console.log('Got:', value);
});
client.hkeys('camping', function(err, keys) {
    if(err) throw err;
    console.log(keys);
});

// 链表
// client.lpush('tasks', 'data links1', redis.print);
// client.lpush('tasks', 'data links2', redis.print);
// client.lpop('tasks');
client.lrange('tasks', 0, -1, function(err, items) {
    if (err) throw err;
    console.log('链表：', items);
});

// 集合
client.sadd('set', '192.168.1.112');
client.sadd('set', '192.168.1.112');
client.sadd('set', '192.168.1.108');
client.smembers('set', function(err, members) {
    if (err) throw err;
    console.log('集合', members);
});