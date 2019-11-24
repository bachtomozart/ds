/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
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

console.log(`${isValid('{[]}')}`);
console.log(`${isValid('(){}[]')}`);


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid2 = function(s) {
  if (s.length === 0) return true;
  let map = new Map();
  map.set(')', '(');
  map.set('}', '{');
  map.set(']', '[');
  let previous = s[0];
  for(let i=1; i < s.length; i = i+2) {
      if(map.get(s[i]) !== previous) {
          return false;
      }
      previous = s[i+1];
  }
  return true;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid3 = function(s) {
  if (s.length === 0) return true;
  let map = new Map();
  map.set('(', 0);
  map.set(')', 0);
  map.set('{', 0);
  map.set('}', 0);
  map.set('[', 0);
  map.set(']', 0);
  for(let i=0; i < s.length; i++) {
      if(map.has(s[i])) {
          map.set(s[i], map.get(s[i]) + 1);
      }
  }
  for(let [key, value] of map.entries()) {
      if(key === '(' && map.get(')') !== value) {
          return false;
      }
      if(key === '{' && map.get('}') !== value) {
          return false;
      }
      if(key === '[' && map.get(']') !== value) {
          return false;
      }
  }
  return true;
};