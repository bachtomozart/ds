'use strict'

/**
 * @param {string} s 
 * @return {string} s
 * https://leetcode.com/problems/reverse-vowels/
 */
let vowels = new Set(['a', 'e', 'i', 'o', 'u']);

function reverseVowels(s) {
  let result = reverse(s);
  console.log(`${s} -> ${result}`);
  return result;
}

let reverse = (s, start = 0, end = s.length - 1) => {
  if (start >= end) return s;
  if(vowels.has(s[start]) && !vowels.has(s[end])) {
    return reverse(s, start, end - 1);
  } else if(!vowels.has(s[start]) && vowels.has(s[end])) {
    return reverse(s, start + 1, end);
  } else if(vowels.has(s[start]) && vowels.has(s[end])) {
    [s[start], s[end]] = [s[end], s[start]];
    return reverse(s, start + 1, end - 1);
  }
}

reverseVowels('hello');