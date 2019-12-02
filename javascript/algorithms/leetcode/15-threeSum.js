'use strict'

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let recursiveCount = 0;
let tdCount = 0;
var threeSum = function (nums) {
  let set = new Set(nums);

  // Recursive
  let result = new Set();
  let added = new Set();
  three(nums, set, (val) => {
    let start = val[0];
    let end = val[1];
    let inverse = val[2];
    if(!added.has(start) || !added.has(end) || !added.has(inverse)) {
      added.add(start);
      added.add(end);
      added.add(inverse);
      result.add(val.join(''));
    }
  });
  console.log(`${recursiveCount} -> ${[...result]}`)

  let dp = Array.from({
    length: nums.length
  }, () => Array(nums.length).fill(false));
  let tdResult = new Set();
  added = new Set();
  threeTopDown(nums, set, dp, (val) => {
    // tdResult.add(val.sort((a, b) => a - b).join(''));
    let start = val[0];
    let end = val[1];
    let inverse = val[2];
    if(!added.has(start) || !added.has(end) || !added.has(inverse)) {
      added.add(start);
      added.add(end);
      added.add(inverse);
      tdResult.add(val.join(''));
    }
  });
  console.log(`${tdCount} -> ${[...tdResult]}`)
};

let three = (nums, set, cb, start = 0, end = nums.length - 1) => {
  if (start >= end) return;
  recursiveCount++;
  let sum = nums[start] + nums[end];
  let inverse = 0 - sum;
  if (set.has(inverse) && (inverse !== nums[start] && inverse !== nums[end])) {
    cb([nums[start], nums[end], inverse]);
  }
  three(nums, set, cb, start + 1, end);
  three(nums, set, cb, start, end - 1);
  return;
};

let threeTopDown = (nums, set, dp, cb, start = 0, end = nums.length - 1) => {
  if (start >= end) return;
  if (dp[start][end]) return;
  tdCount++;
  let sum = nums[start] + nums[end];
  let inverse = 0 - sum;
  if (set.has(inverse) && (inverse !== nums[start] && inverse !== nums[end])) {
    // console.log(`${start} - ${end}`);
    // console.log(`${nums[start]} - ${nums[end]}\n`);
    cb([nums[start], nums[end], inverse]);
    dp[start][end] = true;
  }
  threeTopDown(nums, set, dp, cb, start + 1, end);
  threeTopDown(nums, set, dp, cb, start, end - 1);
  return;
};

threeSum([-1, 0, 1, 2, -1, -4]);