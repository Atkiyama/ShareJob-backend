"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const comparator = (a, b) => {
    // dateが新しい順にソートするため、dateを日付として比較する
    return new Date(b.date).getTime() - new Date(a.date).getTime();
};
function sort(arr) {
    return mergeSort(arr, comparator);
}
exports.sort = sort;
function mergeSort(arr, comparator) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = [];
    const right = [];
    for (let i = 0; i < middle; i++) {
        left.push(arr[i]);
    }
    for (let i = middle; i < arr.length; i++) {
        right.push(arr[i]);
    }
    return merge(mergeSort(left, comparator), mergeSort(right, comparator), comparator);
}
function merge(left, right, comparator) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (comparator(left[leftIndex], right[rightIndex]) < 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        }
        else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    return result;
}
