function hashSet (arr) {
    let _set = []
    let hash = {}

    for (let i = 0;i < arr.length;i++) {

        if (!hash[arr[i]]) {
            _set.push(arr[i])
            hash[arr[i]] = true
        }
    }

    return _set
}

console.log(hashSet([3, 1, 2, 4, 4, 3]))