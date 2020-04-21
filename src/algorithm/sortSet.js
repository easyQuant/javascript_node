function sortSet (arr) {
    let _set = []
    arr.sort()

    for (let i = 0; i < arr.length;i++) {

        // 如果前面不等于后面
        if (arr[i] !== arr[i + 1]) {
            _set.push(arr[i])
        }
    }

    return _set
}

console.log(sortSet([3, 1, 2, 4, 4, 4, 3, 5, 5]))