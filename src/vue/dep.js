// 定义调度中心对象
class Dep {

    constructor () {
        this.subs = []
    }

    // 添加订阅者
    addSub (sub) {
        this.subs.push(sub)
    }

    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

// 订阅者实例
class Watcher {

    constructor () {

        // 改变当前的订阅者
        Dep.target = this
    }

    update () {
        console.log('视图更新')
    }
}

Dep.target = null

module.exports = { Dep, Watcher }