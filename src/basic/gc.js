// 垃圾回收分为 引用计数 和 标记清除
// 引用计数 被引用一次 count + 1 设置为 null 则为0 
// 当为0 时 gc在一个 event hoop 进行回收

// 标记清除
// 进入时 标记为 进入
// 退出时 标记为 退出
// 下一个event hoop时 清除所有标记为退出的变量
