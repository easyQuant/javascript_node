// 闭包
// 函数可以形成闭包
// 闭包由 函数 和 函数所在的词法环境共同组成 该环境包含 闭包创建时 所声明的所有局部变量
function A () {

    // 闭包
    let name = 'quant'

    function closures () {
        console.log(name)
    }

    global.closures = closures
}

A()
closures()

let data = {
    fn: function () {
        let name = 'quant'
        let _self = this
        console.log(_self) // data

        function closures () {
            console.log(name)
            console.log(this)
            console.log(_self)
        }

        return closures
    }
}

// data.fn()() // quant data => global => data
let fn2 = data.fn
fn2()() // global => global => global