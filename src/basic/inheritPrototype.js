// 原型链
function F () {}

let f = new F()

f.__proto__ === F.prototype

F.__proto__ === Function.prototype

Function.__proto__ === Function.prototype

// 原型对象的构造函数 是对象
Function.prototype.__proto__ === Object.prototype

// 原型对象的原型 指向 null
Object.prototype.__proto__ === null

// 几种继承方法
function Sub () {}

function Super () {}

// 1. 原型链继承
Sub.prototype = new Super()

// 2. 构造函数继承
function Sub () {
    Super.call(this)
}

// 3. 组合式继承
function Sub () {
    Super.call(this)
}

Sub.prototype = new Super()

// 修复构造函数指向
Sub.constructor = Sub

// 4. 原型式继承
function _create (o) {

    // 临时生成一个构造函数
    function F () {}

    // 原型对象指向这个父类的实例
    F.prototype = o

    return new F()
}

let _super = new Super()
let sub = _create(_super)

// 5. 寄生式继承
function Sub () {
    Super.call(this)
}

function Super () {}

function _create (o) {

    function F () {}
    
    F.prototype = o

    return new F()
}

function interitPrototype (Sub, Super) {

    // 获取父类原型对象的clone
    let _prototype = _create(Super.prototype)

    // 修复父类构造函数指向
    _prototype.constructor = Sub

    // 挂载原型对象到子类
    Sub.prototype = _prototype

    return Sub
}

let sub = new interitPrototype(Sub, Super)