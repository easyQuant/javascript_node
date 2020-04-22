// vue的生命周期钩子有那些

// vue初始化完成 数据观测 watcher event 还未进行配置
beforeCreate

// vue实例化完成 已经完成数据观测 watcher 和 event的callback computed 和 methods的运算
created

// 首次运行render函数前调用
beforeMount

// 首次运行render函数后调用 此时 $el 已经可以访问到
mounted

// 数据观测发生改变时调用 还未进行 vnode 的 diff 和 patch
beforeUpdate

// vnode patch后调用
udpated

// vue组件销毁之前调用 会判断是否已经销毁了 
beforeDistory

// vue组件销毁之后调用 此时 当前组件以及子组件的 定时器 watcher event 都被销毁了
distoryed

// 子组件出现错误时调用
errorCaptured

// 缓存组件激活时调用
activated

// 缓存组件停用时调用
deactivated