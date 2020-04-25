// 防抖
function debouncing (fn, time) {

    let timer = null

    let self = this

    return function (_arguments) {
        
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            fn.call(self, _arguments)
        }, time)
    }
}

// 截流
function throttle (fn, time) {

    // 保存之前的时间
    let lastTime = 0

    return function (args) {

        // 获取当前时间
        let nowTime = Date.now()

        // 如果当前时间 - 之前最后的时间 大于 时间间隔 则执行
        if ((nowTime - lastTime) > time) {
            lastTime = nowTime
            fn.call(this, args)
        }
    }
}