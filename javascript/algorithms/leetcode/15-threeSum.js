'use strict'

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let set = new Set(nums);
  let result = new Set();
  three(result, set, nums);
  console.log(`${[...result]}`)
};

let three = (result, set, nums, start = 0, end = nums.length - 1) => {
  if (start >= end) return;
  let sum = nums[start] + nums[end];
  let inverse = 0 - sum;
  if (set.has(inverse) && (inverse !== nums[start] && inverse !== nums[end])) {
    let temp = [nums[start], nums[end], inverse];
    temp.sort((a, b) => a - b);
    result.add(temp[0].toString() + ',' + temp[1].toString() + ',' + temp[2].toString());
  }
  three(result, set, nums, start + 1, end);
  three(result, set, nums, start, end - 1);
  return result;
};

threeSum([-1, 0, 1, 2, -1, -4]);