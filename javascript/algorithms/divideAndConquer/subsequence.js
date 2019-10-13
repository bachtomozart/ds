'use strict'

class Subsequence {
  constructor() {
    
  }

  getLCS(input1, input2) {
    let lcs = this.findLCS(input1, input2);
    console.log(`The LCS for ${input1} and ${input2} is ${lcs}`);
  }

  getLCP(input) {
    let lcs = this.findLCP(input);
    console.log(`The LCP for ${input} is ${lcs}`);
  }

  getLPS(input) {
    let lps = this.findLPS(input);
    console.log(`The LPS for ${input} is ${lps}`);
  }

  findLCS(input1, input2, pos1 = 0, pos2 = 0) {
    if(pos1 >= input1.length || pos2 >= input2.length) return 0;
    if(input1[pos1] === input2[pos2]) {
      return 1 + this.findLCS(input1, input2, pos1 + 1, pos2 + 1);
    }
    let different1 = this.findLCS(input1, input2, pos1 + 1, pos2);
    let different2 = this.findLCS(input1, input2, pos1, pos2 + 1);
    return Math.max(different1, different2);
  }

  findLCP(input, start = 0, end = input.length - 1) {
    if(start > end) return 0;
    if(start === end) return 1;
    if(input[start] === input[end]) {
      return 2 + this.findLCP(input, start + 1, end - 1);
    }
    let different1 = this.findLCP(input, start + 1, end);
    let different2 = this.findLCP(input, start, end - 1);
    return Math.max(different1, different2);
  }

  findLPS(input, start = 0, end = input.length - 1) {
    if(start > end) return 0;
    if(start === end) return 1;
    if(input[start] === input[end]) {
      let remaining = end - start - 1;
      if(remaining === this.findLPS(input, start + 1, end - 1)) {
        return 2 + remaining;
      }
    }
    let different1 = this.findLPS(input, start + 1, end);
    let different2 = this.findLPS(input, start, end - 1);
    return Math.max(different1, different2);
  }
}

const demo = () => {
  let sub = new Subsequence();
  sub.getLCS('elephant', 'erephant');
  sub.getLCP('MONACO');
  sub.getLPS('MADAMOISELLE')
}

demo();