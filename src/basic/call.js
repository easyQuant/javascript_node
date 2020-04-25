// call apply bind区别

// 1. apply 传递数组参数 call 和 bind 传递多个参数
// 2. call 和 apply都只改变一次this 直接返回函数结果 bind 返回一个永久指向该this的函数 
// 后续使用call或者apply都无法改变this
// 3. bind返回 的 函数可以多次传参
// let max1 = Math.max.apply(null, [1, 2, 3])
// let max2 = Math.max.call(null, 1, 2,3)
// let max3 = Math.max.bind(null, 1, 2, 3)

Function.prototype._bind = function () {
    let _self = this

    if (!_self) {
        _self = typeof window !== 'undefined' ? window : global
    }

    let _fn = arguments[0]

    // 对arguments 使用 slice函数 传递参数为1
    let _args = Array.prototype.slice.call(arguments, 1)

    return function () {

        // 合并数组 对 _args 进行 concat 操作 传递参数为 arguments
        _args = _args.concat.apply(_args, arguments)

        return _self.apply(_fn, _args)
    }
}

let max1 = Math.max._bind(null, 1, 2, 3)
console.log(max1())
console.log(max1(4))

Function.prototype._call = function () {

    // 获得当前传入的this对象
    let context = arguments[0]

    if (!context) {
        context = typeof window !== 'undefined' ? window : global
    }

    let args = []

    for (let i = 0;i < arguments.length;i++) {
        args.push('arguments[' + i + ']')
    }

    // 把当前function放到this对象上 这样后续调用fn this的指向就是 传入的this
    context._fn = this

    // context._fn()
    let result = eval('context._fn(' + args + ')')

    delete context._fn

    return result
}

console.log(Math.max._call(null, 1, 2, 3, 4, 5))