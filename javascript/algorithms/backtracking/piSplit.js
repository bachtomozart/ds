'use strict'

/**
 * 
 * @param {string} s 
 * @param {Set} dict
 */
let splitPi = (s, dict) => {
  let result = s.split('');
  split(s, dict, [], (val) => {
    if(val.length < result.length) result = [...val];
  })
  console.log(`'${s}' with '${[...dict]}' -> ${result}`);
  return [...result];
};

let split = (s, dict, temp, cb) => {
  if (s.length === 0) {
    cb(temp);
    return;
  } else {
    for (let i = 0; i < s.length; i++) {
      let word = s.substring(0, i + 1);
      if (dict.has(word)) {
        temp.push(word);
        split(s.substring(i + 1), dict, temp, cb);
        temp.pop();
      }
    }
  }
};

splitPi('1415926535897932384626433832795', new Set([
  '1415',
  '14159265358',
  '14159265358979',
  '323846',
  '2643383',
  '2795',
  '97932384626433',
  '832795'
]));