function EventEmitter() {
    this.events = {}
}

// 订阅/响应事件
EventEmitter.prototype.on = function (event, fn) {
    this.events[event] = fn
}

// 发布事件
EventEmitter.prototype.emit = function (event, ...params) {
    
    // 判断是否订阅过
    if (this.events[event]) {
        this.events[event](...params)
    }
    else {
        console.log(`没有订阅 ${event} 事件`)
    }
}

EventEmitter.prototype.off = function (event) {
    delete this.events[event]
}