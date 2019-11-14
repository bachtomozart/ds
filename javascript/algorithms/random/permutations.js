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




function countPairsWithSum(k, a) {
  let result = 0;
  let map = new Map();
  for (let i = 0; i < a.length; i++) {
    if (map.has(a[i])) map.set(a[i], map.get(a[i]) + 1);
    else map.set(a[i], 1);
  }
  for (let [key, value] of map.entries()) {
    let balance = k - key;
    if (map.has(balance)) {
      if (key !== balance) {
        map.delete(key);
        map.delete(balance);
        result++;
      } else {
        if (map.get(key) > 1) {
          map.set(key, map.get(key) - 1);
          result++;
          map.delete(key);
        }
      }
    }
  }
  console.log(`${result}`);
  return result;
}

countPairsWithSum(12, [7, 15, 9, 10, 2, 1, 5, 2, 6, 11, 6]);

function sumWithProduct(n) {
  let s = n.toString().split('');
  let sum = 0,
    product = 1;
  for (let i = 0; i < s.length; i++) {
    sum += Number(s[i]);
    product *= Number(s[i]);
  }
  let result = product - sum;
  console.log(`${result}`);
  return result;
}

sumWithProduct(123456)