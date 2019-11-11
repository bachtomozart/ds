/**
 * @param {string} str
 * @return {number}
 * https://leetcode.com/problems/string-to-integer-atoi/
 */
var myAtoi = function(str) {
  let whitelist = new Set(['+', '-', ' ']);
  let numberlist = new Set(['1','2','3','4','5','6','7','8','9','0']);
  let start = false;
  let output = '';
  for(let i=0;i<str.length;i++) {
      if(whitelist.has(str[i]) && !start) {
        output += str[i];
      } else if(numberlist.has(str[i])) {
          output += str[i];
          if(!start) start = true;
      } else {
          break;
      }
  }
  output = output.replace(' ', '');
  let result = Number(output);
  if(Number.isNaN(result)) return 0;
  if(result < 0) {
      return Math.max(-2147483648, result);
  } else {
      return Math.min(2147483647, result);
  }
};