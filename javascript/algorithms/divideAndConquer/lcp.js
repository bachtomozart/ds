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

  findLCP(string) {
    if(!string[0]) return new Array();
    let result1 = new Array(string[0]), result2 = new Array();
    let tempResult = this.findLCP(string.slice(1));
    result1.push(...tempResult);
    result2.push(...tempResult);
    let string1 = result1.join('');
    let reverseString1 = result1.reverse().join('');
    let return1 = false;
    if(result1 && 
      result1.length && 
      string1 === reverseString1) {
      if(result1.length > this.max) {
        this.max = result1.length;
        this.maxSubSequence = result1;
      }
      return1 = true;
    } 
    let return2 = false;
    let string2 = result2.join('');
    let reverseString2 = result2.reverse().join('');
    if (result2 && 
      result2.length && 
      string2 === reverseString2) {
      if(result2.length > this.max) {
        this.max = result2.length;
        this.maxSubSequence = result2;
      }
      return2 = true;
    }
    if(return1 && !return2) {
      return result1;
    } else if (!return1 && return2) {
      return result2
    } else if (return1 && return2) {
      if(result1.length > result2.length) {
        return result1;
      } else {
        return result2;
      }
    }
  }

  getString(array) {
    return array.reduce((acc,item) => acc + item, []);
  }

}

const demo = () => {
  let lcp = new LCP();
  lcp.getLCP('MONIO');
  lcp.getLCP('MONACO');
}

demo();