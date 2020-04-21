// 原型链
function F () {}

let f = new F()

// 实例f的原型 指向 构造函数F的原型对象
// console.log(f.__proto__ === F.prototype)

// // F对象的原型 指向 Function的原型对象
// console.log(F.__proto__ === Function.prototype)

// // Function对象的原型 指向 Function对象的原型对象
// console.log(Function.__proto__ === Function.prototype)

// // Function的原型对象 的 原型 指向 Object的原型对象
// console.log(Function.prototype.__proto__ === Object.prototype)

// // Object的原型对象 的 原型 指向 null
// console.log(Object.prototype.__proto__ === null)

// 继承方式

// 1. 原型链继承
function Sub () {}

function Super () {}

Sub.prototype = new Super()

// 2. 构造函数继承
function Sub () {
    Super.call(this)
}

function Super () {}

// 3. 组合继承
function Sub () {
    Super.call(this)
}

function Super () {}

Sub.prototype = new Super()

// 修复构造函数指向
Sub.constructor = Sub

// 4. 原型式继承
function Super () {}

function _create (o) {

    // 临时生成构造函数
    function F () {}

    // 把父类的实例对象 挂载到原型
    F.prototype = o
    return new F()
}

let sub = _create(new Super())

// 5. 寄生式继承

// 封装继承过程的函数
function createNew (o) {
    let sub = _create(o)
    sub.xxx = function () {}
    return sub
}

// 6. 寄生组合式继承
function Sub () {
    Super.call(this)
}

function Super () {}

function inheritPrototype (sub, _super) {

    // 不传入父类的实例 直接传入父类的原型对象
    let _prototype = _create(_super.prototype)
    
    // 子类的原型对象 指向这个新的原型对象
    sub.prototype = _prototype

    // 修复bug
    sub.constructor = sub

    return sub
}