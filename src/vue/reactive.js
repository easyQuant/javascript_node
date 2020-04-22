const { Dep, Watcher } = require('./dep')

class Vue {

    constructor (options) {
        this._data = options.data
        observer(this._data)

        // 创建订阅者 修改 Dep.target 指向
        new Watcher()

        // 执行属性的reactiveGetter 函数 进行依赖收集
        this._data.count
    }
}

// 对对象所有属性 进行 数据观测
function observer (value) {

    if (!value || (typeof value !== 'object')) {
        return false
    }

    Object.keys(value).forEach(key => {

        // 对每个属性进行数据观测
        defineReactive(value, key, value[key])
    })
}

// 模拟视图更新
function cb (val) {
    console.log('视图更新了')
}

// 重点 对数据进行观测
function defineReactive (obj, key, val) {

    // 每个属性都创建一个调度中心实例
    let dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,

        configurable: true,

        // 对象属性读取时调用
        get: function reactiveGetter () {

            console.log(`${key} 进行依赖收集`)

            // 把当前订阅者添加到当前的调度中心实例
            dep.addSub(Dep.target)
            return val
        },

        // 对象属性写入时调用
        set: function reactiveSetter (newVal) {

            if (newVal === val) {
                return false
            }

            // 更新reactiveGetter 中返回的值
            val = newVal

            // 设置值时候 更新所有视图
            dep.notify()

            // // 数据更新了 调用回调
            // cb(newVal)
        }
    })
}

let vue = new Vue({
    data: {
        count: 1
    }
})

vue._data.count = 2

// // 触发 defineReactive 的 reactiveGetter 方法
// console.log(vue._data.count)

// // 触发 defineReactive 的 reactiveStter 方法
// // 进行更新视图callback
// vue._data.count = 2

// // 再次获取时 是刚刚更改过的
// console.log(vue._data.count)