'use strict'

/**
 * @param {string} s
 * @return {number}
 * https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let latest = new Map(),
    first = new Map(),
    max = 0,
    chars = [];
  for (let i = 0, j = 0; j < s.length; j++) {
    if (latest.has(s[j])) {
      max = Math.max(max, j - i + 1);
      latest.set(s[j], j);
    } else {
      if (latest.size < 2) {
        first.set(s[j], j);
        latest.set(s[j], j);
        chars.push(s[j]);
        max = Math.max(max, j - i + 1);
      } else {
        let latestChar = chars.pop();
        let firstChar = chars.pop();
        if (latest.get(firstChar) > first.get(latestChar)) {
          i = Math.max(i, first.get(latestChar) - 1);
        } else {
          i = Math.max(i, latest.get(firstChar) + 1);
        }
        max = Math.max(max, j - i + 1);

        first = new Map();
        latest = new Map();
        first.set(s[j], j);
        latest.set(s[j], j);
      }
    }
  }
  return max;
};
console.log(lengthOfLongestSubstringTwoDistinct('abaccc'));
console.log(lengthOfLongestSubstringTwoDistinct('ccaabbb'));
console.log(lengthOfLongestSubstringTwoDistinct('eceba'));
console.log(lengthOfLongestSubstringTwoDistinct('cdaba'));