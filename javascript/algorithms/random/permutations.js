'use strict'

/**
 * @param {Array} nums 
 * @returns {Array} result
 */
function getPermutations(nums) {
  let result = new Set();
  permute(nums, [], result);
  console.log(`${[...nums]} -> ${[...result]}`);
  return result;
}

let permute = (nums, temp = [], result = new Set()) => {
  if (nums.length === 0) {
    result.add(temp.join(''));
    return;
  } else {
    for (let i = 0; i < nums.length; i++) {
      let pick = nums.splice(i, 1);
      temp.push(...pick);
      permute(nums, temp, result);
      nums.splice(i, 0, temp.pop());
    }
  }
}

getPermutations([1, 2, 3]);
