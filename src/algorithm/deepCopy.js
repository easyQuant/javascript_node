// 数组深拷贝
function deepCopy (data) {
    
    // 如果不是引用类型 直接返回
    if (typeof data !== 'object') {
        return data
    }

    let result = Array.isArray(data) ? [] : {}

    for (let key in data) {

        if (typeof data[key] === 'object') {
            result[key] = deepCopy(data[key])
        } else {
            result[key] = data[key]
        }
    }

    return result
}

let arr_1 = [3, 1, 2, 4]
let arr_2 = deepCopy(arr_1)

arr_1.push(5)

console.log(arr_1)
console.log(arr_2)