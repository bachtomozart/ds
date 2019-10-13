'use strict'

class LCP {
  constructor() {
    this.max = 0;
    this.maxSubSequence = '';
  }

  getLCP(string) {
    const result = this.findLCP(string);
    console.log(`The Longest common palindrome subsequence of ${string} is ${result}`);
  }

  findLCP(string, start = 0, end = (string.length - 1)) {
    if(start > end) return 0;
    if(start === end) return 1;
    if(string[start] === string[end]) {
      return 2 + this.findLCP(string, start + 1, end - 1);
    }
    let different2 = this.findLCP(string, start + 1, end);
    let different1 = this.findLCP(string, start, end - 1);
    return Math.max(different1, different2);
  }
}

const demo = () => {
  let lcp = new LCP();
  lcp.getLCP('MONIO');
  lcp.getLCP('MONACO');
  lcp.getLCP('MADAM');
}

demo();