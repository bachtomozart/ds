'use strict'
let palin = (s, start = 0, end = s.length - 1) => {
  if (start > end) return '';
  if (start === end) return s[start];
  let same = '',
    different1 = '',
    different2 = '',
    different3 = '';
  if (s[start] === s[end]) {
    let remainingLength = end - start - 1;
    let remainingStr3 = palin(s, start + 1, end - 1);
    if (remainingStr3.length === remainingLength) {
      same = s[start] + remainingStr3 + s[end];
    }
  } else {
    different1 = palin(s, start + 1, end);
    different2 = palin(s, start, end - 1);
    different3 = palin(s, start + 1, end - 1);
  }
  if (same.length >= different1.length && same.length >= different2.length) {
    return same;
  } else if (different1.length >= same.length && different1.length >= different2.length && different1.length >= different3.length) {
    return different1;
  } else if (different2.length >= same.length && different2.length >= different1.length && different2.length >= different3.length) {
    return different2;
  } else if (different3.length >= same.length && different3.length >= different2.length && different3.length >= different1.length) {
    return different3;
  }
}

let array = Array(5).fill(Array(5).fill(0));

let recursiveCounter = 0;

var longestPalindrome = function (s) {
  if (s.length === 0) return s;
  array = Array(s.length).fill(Array(s.length).fill(''));
  let result = palindrome(s.split(''));
  if (result.length === 0) result = s[0];
  console.log(`${result} - recursive - ${recursiveCounter}`);
};


let palindrome = (s, start = 0, end = s.length - 1) => {
  if (start > end) return '';
  if (start === end) return s[start];
  // if (array[start][end]) return array[start][end];
  recursiveCounter++;
  let same = '',
    different1 = '',
    different2 = '';
  if (s[start] === s[end]) {
    let remaining = end - start - 1;
    let remainingString = palindrome(s, start + 1, end - 1);
    if (remaining === remainingString.length) {
      same = s[start] + remainingString + s[end];
    }
  }
  different1 = palindrome(s, start + 1, end);
  different2 = palindrome(s, start, end - 1);
  if (same.length > different1.length && same.length > different2.length) {
    array[start][end] = same;
  } else if (different1.length > same.length && different1.length > different2.length) {
    array[start][end] = different1;
  } else if (different2.length > same.length && different2.length >= different1.length) {
    array[start][end] = different2;
  }
  return array[start][end];
}

// longestPalindrome('babad');
longestPalindrome('babad');