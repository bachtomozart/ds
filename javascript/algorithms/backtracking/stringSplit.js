'use strict'

/**
 * 
 * @param {string} s 
 * @param {Set} dict 
 */
let stringSplit = (s, dict) => {
  let result = [];
  split(s, dict, (val) => {
    result.push(val);
  });
  console.log(`Splitting '${s}' with '${[...dict]}' -> ${[...result]}`);
  return result;
};

let split = (s, dict, cb, temp = []) => {
  if (s.length === 0) {
    cb(Array.from(temp));
    return;
  } else {
    for (let i = 0; i < s.length; i++) {
      let word = s.substring(0, i+1);
      if(dict.has(word)) {
        temp.push(word);
        split(s.substring(i+1), dict, cb, temp);
        temp.pop();
      }
    }
  }
};

stringSplit('catsanddog', new Set(['cat', 'cats', 'sand', 'and', 'dog']));