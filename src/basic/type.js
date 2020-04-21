// 1. 基本数据类型有哪些
// number string boolean null undefined object Symbol

// 为什么 typeof null === 'object' 但是是基本数据类型?
// 因为js对象在底层都是使用二进制标识的 规定前三位为0 类型就是 object null 6位都是0 所以返回 object类型

// Symbol 代表一种唯一标记 应用场景为 替换常量 作为对象的唯一key值

// 原生对象有哪些
// Object Array Function Boolean String Number Date Math Error RegExp NaN

// 宿主对象有哪些
// Window Document Global