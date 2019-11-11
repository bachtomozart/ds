/**
 * @param {number[]} height
 * @return {number}
 * https://leetcode.com/problems/container-with-most-water/
 */

let array = undefined;
let map = new Map();
let getKey = (start, end) => start + '-' + end;
var maxArea = function(height) {
    array = Array(height.length).fill(Array(height.length).fill(0));
    return findMaxArea(height);
};

let findMaxArea = (input, start = 0, end = input.length - 1) => {
    if(start >= end) return 0;
    if(array[start][end]) return array[start][end];
    //if(map.has(getKey(start,end))) return map.get(getKey(start,end));
    let area = Math.min(input[start], input[end]) * (end - start);
    let different1 = findMaxArea(input, start + 1, end);
    let different2 = findMaxArea(input, start, end - 1);
    let result = Math.max(area, different1, different2);
    array[start][end] = result;
    //map.set(getKey(start,end), result);
    return result;
}