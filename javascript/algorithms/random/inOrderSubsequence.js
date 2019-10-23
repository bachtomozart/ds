'use strict'

class Subsequence {
  constructor(params) {

  }

  checkSubsequence(s1, s2) {
    let result = this.isSubsequence(s1, s2);
    console.log(`The subsequence check for '${s1}' in '${s2}' - ${result}`);
  }

  isSubsequence(s1, s2) {
    if (s2.length < s1.length) return false;
    // good luck. Add any arguments you deem necessary.
    let p1 = 0,
      p2 = 0;
    while (p2 < s2.length) {
      if (s1[p1] === s2[p2]) {
        ++p1;
        ++p2;
      } else {
        ++p2;
      }
      if (p1 >= s1.length) return true;
    }
    return false;
  }
}

const demo = () => {
  let ss = new Subsequence();
  ss.checkSubsequence('Hello', 'Hello World');
  ss.checkSubsequence('Sing', 'Sting');
  ss.checkSubsequence('abc', 'acb');
}

demo();