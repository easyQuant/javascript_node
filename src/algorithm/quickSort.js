// 快速排序
function quickSort (arr) {

    if (arr.length <= 1) {
        return arr
    }

    let piovtIndex = Math.floor(arr.length / 2)
    let piovt = arr.splice(piovtIndex, 1)[0]

    let leftArr = []
    let rightArr = []

    for (let i = 0;i < arr.length;i++) {

        if (arr[i] < piovt) {
            leftArr.push(arr[i])
        } else {
            rightArr.push(arr[i])
        }
    }

    return quickSort(leftArr).concat([piovt], quickSort(rightArr))
}

console.log(quickSort([3, 1, 2, 4]))