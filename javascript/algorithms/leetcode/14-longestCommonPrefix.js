'use strict'

/**
 * @param {array} inputs
 * @return {string} s
 * https://leetcode.com/problems/longest-common-prefix/
 */

function longestCommonPrefix(inputs) {
  let globalSet = new Set([...inputs[0]]);
  for (let i = 1; i < inputs.length; i++) {
    let currentSet = new Set();
    for (let j = 0; j < inputs[i].length; j++) {
      if (globalSet.has(inputs[i][j])) {
        currentSet.add(inputs[i][j])
      }
    }
    globalSet = new Set([...currentSet])
  }
  let result = [...globalSet].join('');
  console.log(`${result}`);
  return result;
}

longestCommonPrefix(['flower', 'flow', 'flight']);
longestCommonPrefix(['race', 'a', 'car']);
