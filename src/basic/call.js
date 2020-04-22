// call apply bind区别

// 1. apply 传递数组参数 call 和 bind 传递多个参数
// 2. call 和 apply都只改变一次this 直接返回函数结果 bind 返回一个永久指向该this的函数 
// 后续使用call或者apply都无法改变this
// 3. bind返回 的 函数可以多次传参
let max1 = Math.max.apply(null, [1, 2, 3])
let max2 = Math.max.call(null, 1, 2,3)
let max3 = Math.max.bind(null, 1, 2, 3)

console.log(max1)
console.log(max2)
console.log(max3())
console.log(max3(4))

// 实现bind函数
Function.prototype._bind = function () {

    // 获取本身的this指向
    let _self = this
    
    // 保存第一次bind传入的this指向
    let _fn = arguments[0]

    // 获取传入的参数
    let _args = Array.prototype.slice.call(arguments, 1)

    // 返回一个可以随时 this指向 _fn的函数
    return function () {

        // 拼接参数
        _args = _args.concat.apply(_args, arguments)

        // 调用this指向 _fn的函数 参数是拼接好的
        return _self.apply(_fn, _args)
    }
}

let max4 = Math.max._bind(global, 1, 2, 3)
console.log(max4())
console.log(max4(4))
console.log(max4(5))