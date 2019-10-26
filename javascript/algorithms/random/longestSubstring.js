'use strict'

class LongestSubstring {
  constructor() {

  }

  getLS(input) {
    let result = this.findLongestSubstring2(input);
    console.log(`The Longest substring for ${input} is ${result}`);
  }
  findLongestSubstring(input){
    if(!input) return 0;
    // add whatever parameters you deem necessary - good luck!
    let max = 0, i = 0, j = 1, hashSet = new Set([input[i]]);
    while(j < input.length) {
        if(!hashSet.has(input[j])) {
            hashSet.add(input[j]);
            j++;
        } else {
            max = Math.max((j - i), max);
            i++;
            j = i + 1;
            hashSet = new Set([input[i]]);
        }
    }
    max = Math.max((j-i), max);
    return max;
  }

   findLongestSubstring2(str) {
    let longest = 0;
    let seen = {};
    let start = 0;

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (seen[char]) {
        start = Math.max(start, seen[char]);
      }
      // index - beginning of substring + 1 (to include current in count)
      longest = Math.max(longest, i - start + 1);
      // store the index of the next char so as to not double count
      seen[char] = i + 1;
    }
    return longest;
  }
}

const demo = () => {
  let ls = new LongestSubstring();
  ls.getLS('thisisawesome');
  // ls.getLS('longestsubstring');
  // ls.getLS('');
}

demo();