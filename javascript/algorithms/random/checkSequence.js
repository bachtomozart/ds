'use strict'

/**
 * 
 * @param {number array} nums 
 * @returns Boolean 
 */
function checkSequence(nums) {
  if(nums.length === 0 || nums.length === 1) return true;
  let result = check(nums);
  console.log(`${nums} -> ${result}`);
  return result;
}

let check = (array, i = 1) => {
  if(i >= array.length) return true;
  if(array[i] - array[i-1] !== 1) return false;
  return check(array, i+1);
};

checkSequence([2,3,4,5,6,7]);
checkSequence([2,4,5,6,7]);