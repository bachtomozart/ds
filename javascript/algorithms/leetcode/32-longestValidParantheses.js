/**
 * @param {string} s
 * @return {boolean}
 */
var longestValid = function(s) {
  if (s.length === 0) return true;
  let map = new Map();
  map.set(')', '(');
  map.set('}', '{');
  map.set(']', '[');
  let stack = [];
  for(let i=0; i < s.length; i++) {
    if(map.has(s[i])) {
      let previous = stack.pop();
      if(map.get(s[i]) !== previous) {
        return false;
      }
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length === 0;
};

longestValid('((()');
longestValid('()((())((((()))()');