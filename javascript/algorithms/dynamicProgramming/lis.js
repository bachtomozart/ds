'use strict'

/**
 * 
 * @param {Number Array} nums 
 */
let getLIS = (nums) => {
  let result = lis(nums);
  console.log(`${nums} -> ${result}`);
  return result;
};

let lis = (nums, pos = 0) => {
  if (pos >= nums.length) return 0;

};

getLIS([0, 4, 2, 3, 1, 5, 8]);