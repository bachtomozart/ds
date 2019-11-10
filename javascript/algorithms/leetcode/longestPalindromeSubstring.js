'use strict'

var longestPalindrome = function(s) {
  let result = palin(s.split(''));
  console.log(`${result}`);
};

let palin = (s, start = 0, end = s.length-1) => {
  if(start > end) return '';
  if(start === end) return s[start];
  let same = '', different1 = '', different2 = '';
  if(s[start] === s[end]) {
      let remainingLength = end - start + 1;
      let remainingStr = palin(s, start+1, end-1);
      if(remainingStr.length === remainingLength) {
          same = s[start] + remainingStr + s[end];
      }
  } else {
      different1 = palin(s, start + 1, end);
      different2 = palin(s, start, end - 1);
  }
  if(same.length >= different1.length && same.length >= different2.length) {
      return same;
  } else if(different1.length >= same.length && different1.length >= different2.length) {
      return different1;
  } else if(different2.length >= same.length && different2.length >= different1.length) {
      return different2;
  }
}

longestPalindrome('babad');