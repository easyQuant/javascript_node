function _Promise (executor) {
    let self = this
    self.status = 'pending'
    self.value = undefined
    
    // 回调函数队列
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    // 调用成功函数
    function resolve (value) {

        // 异步执行所有的回调函数
        setTimeout(function () {
            // console.log('self.status ', self.status)

            if (self.status === 'pending') {
                self.status = 'resolve'
                self.value = value

                // console.log('self.status', self.status)
                // console.log('self.value', self.value)
                // console.log('self.onResolvedCallback', self.onResolvedCallback)
    
                for (let i = 0;i < self.onResolvedCallback.length;i++) {
                    self.onResolvedCallback[i](value)
                }
            }
        })
    }

    // 调用失败函数
    function reject (value) {

        setTimeout(function () {

            // 状态等于初始状态时 设置状态和值
            if (self.status === 'pending') {
                self.status = 'rejected'
                self.value = value

                for (let i = 0;i < self.onRejectedCallback.length;i++) {
                    self.onRejectedCallback[i](value)
                }
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

// 回调函数
_Promise.prototype.then = function (onResolved, onRejected) {
    let self = this
    let promise2

    // 如果不是function则忽略
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) { return v }
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) { return r }

    // console.log('then self.status', self.status)

    if (self.status === 'resolve') {
        return promise2 = new _Promise(function (resolve, reject) {

            // 异步执行 onResloved
            setTimeout(function () {
                try {

                    // 在新实例化的promise实例中调用callback
                    let x = onResolved(self.value)

                    // console.log('x', x)

                    // 如果返回的是promise实例
                    // 则继续调用这个promise实例的then
                    if (x instanceof _Promise) {
                        x.then(resolve, reject)
                    }

                    // 否则继续执行新的promise的resolve函数
                    resolve(x)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new _Promise(function (resolve, reject) {

            // 异步执行 onRejected
            setTimeout(function () {
                try {
                    let x = onRejected(this.value)

                    // 如果返回的是一个promise实例 则继续调用这个promise的then方法
                    if (x instanceof _Promise) {
                        x.then(resolve, reject)
                    }

                    reject(x)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }

    // 此时还不知道promise的状态
    // 则插入队列中
    if (self.status === 'pending') {
        return promise2 = new _Promise(function (resolve, reject) {
            // console.log('self.onResolveCallback.push')
            self.onResolvedCallback.push(
                function (value) {
                    
                    try {
                        let x = onResolved(self.value)

                        // 如果返回的是Promise实例 则继续执行这个实例的then方法
                        if (x instanceof _Promise) {
                            x.then(resolve, reject)
                        }

                        resolve(x)
                    } catch (err) {
                        reject(err)
                    }
                }
            )

            self.onRejectedCallback.push(
                function (value) {

                    try {
                        let x = onRejected(self.value)

                        // 如果是Promise实例 则继续执行promise的then函数
                        if (x instanceof _Promise) {
                            x.then(resolve, reject)
                        }

                        // 如果不是 则执行reject方法 
                        reject(x)
                    } catch (err) {
                        reject(err)
                    }
                }
            )
        })
    }
}

_Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

let _promise = new _Promise(function executor (resolve, reject) {
    setTimeout(function () {
        resolve(1)
    }, 3000)
})
.then(
    function (value) {
        console.log('value', value)
    }
)