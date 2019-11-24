'use strict'

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let result = threeSum(new Result(target), nums);
  console.log(`result -> ${JSON.stringify(result)}`);
  return result;
};

class Result {
  constructor(target) {
    this.target = target;
    this.sum = Infinity;
    this.nums = [];
  }
}

let threeSum = (result, nums, start = 0, end = nums.length - 1) => {
  if (start > end) return;
  for (let num of nums) {
    let total = num + nums[start] + nums[end];
    if (total === result.target) {
      result.sum = total;
      result.nums = [num, nums[start], nums[end]];
    } else if (Math.abs(total) < result.sum) {
      result.sum = total;
      result.nums = [num, nums[start], nums[end]];
    }
  }
  threeSum(result, nums, start + 1, end);
  threeSum(result, nums, start, end - 1);
  return result;
};

threeSumClosest([-1, 2, 1, 4], 1);