'use strict'

/**
 *
 * @param {Array} nums
 * @returns {Array} result
 */
function findPermutations(nums) {
  let result = new Set();
  permute([], nums, result);
  console.log(`${[...result]}`);
  return [...result];
}

let permute = (temp, nums, result) => {
  if (nums.length === 0) {
    result.add(temp.join(''));
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    let newNum = nums.splice(i, 1);
    temp.push(...newNum);
    permute(temp, nums, result);
    temp.pop();
    nums.splice(i, 0, ...newNum);
  }
}

// findPermutations([1,2,3])




