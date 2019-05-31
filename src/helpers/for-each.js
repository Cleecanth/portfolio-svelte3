export default function(arr, callback) {
    const len = arr.length;
    for (var i = 0; i < len; i++) {
        callback(arr[i], i);
    }
}
