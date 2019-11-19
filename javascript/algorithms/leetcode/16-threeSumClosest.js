'use strict'

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  let set = new Set(nums);
  let result = threeSum(new Result(), target, nums);
  console.log(`result -> ${result}`);
  return result;
};

class Result {
  constructor() {
    this.sum = Infinity;
    this.difference = Infinity;
    this.nums = [];
  }
}

let threeSum = (result, target, nums, start=0, end = nums.length-1) => {
  if(start > end) return;
  let sum = nums[start] + nums[end];
  let difference = target - sum;
  if(difference < result.difference) {

  }
};

threeSumClosest([-1,2,1,4], 1);