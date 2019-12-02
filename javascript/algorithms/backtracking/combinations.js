'use strict'

/**
 * 
 * @param {Number array} nums 
 * @returns Number Array
 */
let getCombinations = (nums, k) => {
  let result = new Set();
  combination(nums, k, [], result);
  console.log(`${[...nums]} -> ${[...result]}`);
  return [...result];
};

let combination = (nums, k, temp, result) => {
  if(temp.length === k) {
    result.add(temp.join(''));
    return;
  }
  if(nums.length === 0) 
    return;
  temp.push(nums[0]);
  combination(nums.slice(1, nums.length), k, temp, result);
  temp.pop();
  combination(nums.slice(1, nums.length), k, temp, result);
}

let combination1 = (nums, k, temp, result, start = 0) => {
  if (temp.length === k) {
    result.add(temp.join(''));
    return;
  } else {
    for (let i = start; i < nums.length; i++) {
      let pick = nums.slice(i, i + 1);
      temp.push(...pick);
      combination(nums, k, temp, result, i + 1);
      temp.pop();
    }
  }
};

getCombinations([3, 2, 5, 8], 3);