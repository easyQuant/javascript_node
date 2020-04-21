// 实现发布订阅模式
function PubSub () {
    this.dep = {}
}

// 添加订阅事件
// 传递callback
PubSub.prototype.sub = function (event, callback) {
    this.dep[event] = this.dep[event] || []
    this.dep[event].push(callback)
}

// 发布事件
PubSub.prototype.pub = function (event, value) {

    // 循环通知订阅的callback
    this.dep[event].map(fn => {
        fn(value)
    })
}

let pubsub = new PubSub()

pubsub.sub('quant', function (value) {
    console.log(`sub quant 1 ${value}`)
})

pubsub.sub('quant', function (value) {
    console.log(`sub quant 2 ${value}`)
})

// 发布任务
pubsub.pub('quant', '今天要赚钱')

// 发布任务
pubsub.pub('quant', '今天不要赚钱')