'use strict'

const Dynamic = require('./dynamic');

class LCP extends Dynamic {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.map = new Map();
    this.array = new Object();
  }

  getLCP(string) {
    let recursive = this.getLCPRecursive(string);
    let topDown = this.getLCPTopDown(string);
    let bottomUp = this.getLCPBottomUp(string);
    let result = recursive;
    console.log(`The LCP for ${string} is ${result}`);
    this.printCounts();
  }

  getLCPRecursive(string, start=0, end=(string.length-1)) {
    this.recursiveCount++;
    if (start > end) return 0;
    if (start === end) return 1;
    if(string[start] === string[end]) {
      return 2 + this.getLCPRecursive(string, start+1, end-1);
    }
    return Math.max(this.getLCPRecursive(string, start+1,end), this.getLCPRecursive(string, start, end-1));
  }

  getLCPTopDown(string, start=0, end=(string.length-1)) {
    this.topDownCount++;
    if (start > end) return 0;
    if (start === end) return 1;
    if (this.map.get(this.getKey(start, end))) return this.map.get(this.getKey(start, end));
    let result = 0;
    if(string[start] === string[end]) {
      result = 2 + this.getLCPTopDown(string, start+1, end-1);
    } else {
      result = Math.max(this.getLCPTopDown(string, start+1,end), this.getLCPTopDown(string, start, end-1));
    }
    this.map.set(this.getKey(start, end), result);
    return result;
  }

  getKey(start, end) {
    return start + '-' + end;
  }


  getLCPBottomUp(string) {
    this.initializeArray(string);
    for(let i=(string.length-1);i>=0;i--) {
      for(let j=0;j<string.length;j++) {
        this.bottomUpCount++;
        if(i>j || i===j) {
          continue;
        } else {
          if(string[i] === string[j]) {
            this.array[i][j] = Math.max((2 + this.array[i+1][j-1]), this.array[i+1][j], this.array[i][j-1]);
          } else {
            this.array[i][j] = Math.max(this.array[i+1][j], this.array[i][j-1]);
          }
        }
      }
    }
    this.printArray(string);
    return this.array[0][(string.length-1)];
  }

  initializeArray(string) {
    this.array = new Object();
    for(let i=0;i<=string.length;i++) {
      this.array[i] = new Object();
      for(let j=0;j<=string.length;j++) {
        if(i>j) {
          // base case
          if (i === string.length) {
            this.array[i][j] = 0;
          } else {
            this.array[i][j] = '-';
          }
        } else if (i === j) {
          // base case
          if (j === string.length) {
            this.array[i][j] = 0;
          } else {
            this.array[i][j] = 1;
          }
        } else {
          // recursive case
          this.array[i][j] = 0;
        }
      }
    }
    this.printArray(string);
  }

  printArray(string) {
    console.log('---------------------------');
    console.log('(-)\t' + string.split('').reduce((acc,item) => acc + '(' + item + ')\t', '') + '(-)\t');
    for(let i=0;i<=string.length;i++) {
      let output = '(' + ( string[i] || '-') + ')\t';
      for(let j=0;j<=string.length;j++) {
        output += '[' + this.array[i][j] + ']\t';
      }
      console.log(output);
    }
    console.log('---------------------------');
  }

}

const demo = () => {
  let lcp = new LCP();
  lcp.getLCP('MONEO');
}

demo();
