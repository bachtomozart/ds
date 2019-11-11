/**
 * @param {number} x
 * @return {boolean}
 * https://leetcode.com/problems/palindrome-number
 */
var isPalindrome = function(x) {
  let s = x.toString();
  let result = palindrome(s);
  return result;
};

let palindrome = (s, start=0, end=s.length-1) => {
  if(start > end) return;
  if(start === end) return true;
  if(s[start] !== s[end]) return false;
  let remaining = end - (start + 1);
  if(remaining) {
      return palindrome(s, start + 1, end - 1);
  } else {
      return true;
  }
}