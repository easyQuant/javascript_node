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
function inheritPrototype (o) {
    let _prototype = _create(o)
    return _prototype
}

let _super = new Super()
let sub = inheritPrototype(_super)

// 6. 寄生组合继承
function inheritPrototype (_sub, _super) {

    // 把父类的原型对象 克隆一份 这样就不用生成父类的实例的 修补了组合继承实例化2次的缺点
    let _prototype = _create(_super.prototype)

    // 修复构造函数的指向
    _prototype.constructor = _sub

    // 实例指向子类的原型对象
    _sub.prototype = _prototype

    return _sub
}

let sub = new inheritPrototype(Sub, Super)