'use strict'

/**
 * 
 * @param {String} s 
 * @returns {Array} result
 */
let printAllAnagrams = (s) => {
  let result = new Set();
  anagram(s.split(''), [], (val) => {
    result.add(val.join(''));
  })
  console.log(`${s} -> ${[...result]}`);
  return [...result];
};

let anagram = (array, temp, cb) => {
  if (array.length === 0) {
    cb(temp);
    return;
  } else {
    for (let i = 0; i < array.length; i++) {
      let pick = array.splice(i, 1);
      temp.push(...pick);
      anagram(array, temp, cb);
      temp.pop();
      array.splice(i, 0, ...pick);
    }
  }
};

printAllAnagrams('god');