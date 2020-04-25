// this有几种形式

// 默认绑定
function fn () {
    console.log(this) // window
}

fn() // 严格模式下为 undefined

// 隐式绑定
let obj = {
    fn: function () {
        console.log(this)
    }
}

obj.fn() // 指向 最后调用的上下文对象

let fn2 = obj.fn
fn2() // 指向window

// 显式绑定
obj.fn.call(window)

// 构造函数绑定
function Fn () {
    console.log(this)
}

new Fn()

// this的显式指向优先级 强制 => 构造函数 => 上下文对象 => 全局

// new 的实现原理

// 创建一个对象
let o = {}  

// 挂载构造函数的原型对象到对象的原型上
o.__proto__ = Foo.prototype

// 执行构造函数 this指向o
Foo.call(o)

// this面试题
var number = 5;
var obj = {
    number: 3,
    fn1: (function () {
        var number;
        this.number *= 2; // 1. window.number = 10
        number = number * 2; // 2. number = NaN
        number = 3;  // 3. number = 3
        return function () {
            var num = this.number; // 4. num = 10 // 7. num = 3
            this.number *= 2; // 5. window.number = 20 // 8. obj.number = 6
            console.log(num); // console.log(10) // 9. console.log(3)
            number *= 3; // 6. number = 9 // 10. number = 27
            console.log(number); // console.log(9) // 11. console.log(27)
        }
    })() // (1) 自执行函数 在当前 event hoop执行
}
var fn1 = obj.fn1; // this指向window
fn1.call(null); // (2) this指向window
obj.fn1(); // (3) this指向obj
console.log(window.number); // (4) console.log(20)