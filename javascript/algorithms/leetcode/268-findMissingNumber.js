/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let sum = (nums.length * (nums.length + 1)) / 2;
  for(let i=0; i < nums.length; i++) {
      sum -= nums[i];
  }
  return sum;
};