'use strict'

/**
 * 
 * @param {Number} number
 * @returns Number
 */
function sumDigits(number) {
  let result = sum(number.toString().split('').map(Number))
  console.log(`${number} -> ${result}`);
  return result;
}

let sum = (array, i = 0) => {
  if (i >= array.length) return 0;
  return array[i] + sum(array, i+1);
};

sumDigits(123456);