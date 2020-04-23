// vuex是一套为vue设计的状态管理模式
// vuex的核心原理是 使用vue 将 Store 中的数据进行响应式化
// 手写一个vuex
let Vue = require('vue')

// 挂载插件
function install (_Vue) {
    Vue.mixin({
        beforeCreate: vuexInit
    })

    Vue = _Vue
}

// 初始化vuex的store
function vuexInit () {
    const options = this.$options

    if (options.store) {
        this.$store = options.store
    } else {
        this.$store = options.parent.store
    }
}

class Store {

    // 实例化Store 将 data 进行依赖收集
    constructor (store) {
        this._vm = new Vue({
            data: {
                $$state: store.state
            },
            store: {}
        })

        this._mutations = {}
        this._actions = {}
    }

    commit (type, payload, _options) {
        const entry = this._mutations[type]

        // 循环执行所有当前type 的mutations
        entry.forEach(function commitIneritor(handler) {
            handler(payload)
        })
    }

    dispatch (type, payload, _options) {
        const entry = this._actions[type]

        // 如果长度大于1
        if (entry.length > 1) {

            // 循环同步执行 actions
            Promise.all(entry.map(handler => handler(payload))) 
        } else {
            entry[0](payload)
        }
    }
}

// 加载插件
Vue.use(install)

// 创建Store
let store = new Store({
    state: {
        count: 1
    },

    mutations: {
        add (state) {
            state.count++
        }
    }
})

let vm = new Vue({ store })

vm.$store.commit('add')