'use strict'

class LPS {

  constructor() {
    this.initialize();
  }

  initialize() {
    this.max = 0;
    this.maxPalindrome = '';
  }

  findMaxPalindrome(input) {
    this.initialize();
    let result = this.findPalindrome(input);
    console.log(`The max palindrome for ${input} is ${result}`);
  }

  findPalindrome(input, start = 0, end = input.length - 1) {
    if (start > end) return 0;
    if (start === end) return 1;
    if(input[start] === input[end]) {
      let remainingLength = end - start - 1;
      if(remainingLength === this.findPalindrome(input, start + 1, end - 1)) {
        return 2 + remainingLength;
      }
    }
    let different1 = this.findPalindrome(input, start+1, end);
    let different2 = this.findPalindrome(input, start, end-1);
    return Math.max(different1, different2);
  }

}

const demo = () => {
  let lps = new LPS();
  lps.findMaxPalindrome('MOM');
  lps.findMaxPalindrome('MADAMOISELLE');
  lps.findMaxPalindrome('GOVIND');
}

demo();