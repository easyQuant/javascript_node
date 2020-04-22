// this有几种形式

// 全局环境的this
function fn () {
    console.log(this) // window
}

fn() // 严格模式下为 undefined

// 上下文对象中调用的this
let obj = {
    fn: function () {
        console.log(this)
    }
}

obj.fn() // 指向 最后调用的上下文对象

let fn2 = obj.fn
fn2() // 指向window

// 3. 强制改变指向 call / apply / bind
obj.fn.call(window)

// 4. 构造函数内的this 
function Fn () {
    console.log(this)
}

new Fn()

// this的显式指向优先级 强制 => 构造函数 => 上下文对象 => 全局

// new 的实现原理

// 创建一个字面量对象
let obj = {}

// 对象的原型指向 构造函数的原型对象
obj.__proto__ = Foo.prototype

// 构造函数的this指向这个对象
Foo.call(obj)