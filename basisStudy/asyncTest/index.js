// 闭包保存变量值
function asyncFunction(callback) {
    setTimeout(callback, 1000);
}

let color = 'skyblue';

(function(color) {
    asyncFunction(function() {
        // 使用了形参 color
        console.log('Color is ', color);
    });
})(color);

color = 'red';