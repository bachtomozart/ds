/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * https://leetcode.com/problems/two-sum/
 */
const twoSum = (nums, target) => {
  let map = new Map();
  for(let i=0;i<nums.length;i++) {
      let complement = target - nums[i];
      if (map.has(complement)) {
          return new Array(map.get(complement), i)
      }
      map.set(nums[i],i);
  }
};