import { Post } from '../model/post';

const comparator = (a: Post, b: Post) => {
    // dateが新しい順にソートするため、dateを日付として比較する
    return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export function sort(arr: Post[]): Post[] {
    return mergeSort(arr, comparator);
}

function mergeSort(arr: Post[], comparator: (a: Post, b: Post) => number): Post[] {
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

function merge<T>(left: T[], right: T[], comparator: (a: T, b: T) => number): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (comparator(left[leftIndex], right[rightIndex]) < 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
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
