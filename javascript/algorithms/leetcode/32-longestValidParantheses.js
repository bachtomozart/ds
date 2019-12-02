/**
 * @param {string} s
 * @return {boolean}
 */
// TODO : Check prev stack empty index and current stack empty index for continuous parentheses check
var longestValid = function (s) {
  if (s.length === 0) return true;
  let stack = [];
  let max = 0,
    current = 0,
    maxEnd = Infinity,
    currentEnd = Infinity;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      if (stack.length) {
        currentEnd = stack.pop();
        current = i - currentEnd + 1;
        if (stack.length === 0) {
          if (currentEnd - maxEnd === 1) {
            max += current;
          } else {
            max = Math.max(max, current);
            maxEnd = i;
          }
          current = 0;
        }
      }
    }
  }
  max = Math.max(max, current);
  console.log(`${s} -> ${max}`);
  return max;
};

// longestValid('()((()())');
// longestValid(')()())');
longestValid('()((()))()(((()))()');