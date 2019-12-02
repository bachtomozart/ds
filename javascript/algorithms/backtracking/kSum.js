'use strict'

/**
 * 
 * @param {Number Array} nums 
 * @param {Number} target 
 * @returns {Number} result
 */
let visited = new Set();
function getKSum(nums, target, k) {
  let result = new Set();
  kSum(nums.sort((a, b) => a - b), target, k, (val) => {
    result.add(val.join(''));
  })
  console.log(`${nums} and ${target} -> ${[...result]}`);
  return result;
}

let kSum = (nums, target, k, cb, temp = [], start = 0) => {
  if (temp.length === k) {
    let sum = temp.reduce((acc, item) => acc + item, 0);
    if (sum === target) {
      cb(temp);
    }
    return;
  } else {
    for (let i = start; i < nums.length; i++) {
      let pick = nums.slice(i, i + 1);
      temp.push(...pick);
      kSum(nums, target, k, cb, temp, i + 1);
      temp.pop();
    }
  }
};

getKSum([10, 1, 2, 7, 6, 1, 5], 8, 3);
getKSum([10, 1, 2, 7, 6, 1, 5], 11, 4);