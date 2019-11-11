/**
 * @param {string} s
 * @return {number}
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */
var lengthOfLongestSubstring = function(s) {
  let map = new Map(), max = 0;
  for(let i =0, j=0;j<s.length;j++) {
      if(map.has(s[j])) {
          i = Math.max(map.get(s[j]), i);
      }
      max=Math.max(max, j-i+1);
      map.set(s[j],j+1);
  }
  return max;
};