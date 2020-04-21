// 冒泡排序
function sort (arr) {

    for (let i = 0;i < arr.length;i++) {

        let flag = false

        for (let j = 0;j < arr.length - i - 1;j++) {

            if (arr[j] > arr[j + 1]) {

                // 前面的做缓存
                let temp = arr[j]

                // 后面的放到前面
                arr[j] = arr[j + 1]

                // 把前面的放后面
                arr[j + 1] = temp

                flag = true
            }
        }

        if (!flag) {
            break;
        }
    }

    return arr
}

console.log(sort([3, 1, 2, 4]))