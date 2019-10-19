'use strict'

const Dynamic = require('./dynamic');

class LPS extends Dynamic {
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.map = new Map();
    this.array = new Object();
  }

  getLPS(string) {
    let recursive = this.findLPSRecursive(string);
    let topDown = this.findLPSTopDown(string);
    let bottomUp = this.findLPSBottomUp(string);
    let result = topDown;
    console.log(`The LPS for ${string} is ${result}`);
    this.printCounts();
  }

  findLPSRecursive(string, start = 0, end = (string.length-1)) {
    this.recursiveCount++;
    if(start > end) return 0;
    if(start === end) return 1;
    if(string[start] === string[end]) {
      let remaining = end - start - 1;
      if(remaining === this.findLPSRecursive(string, start+1, end-1)) {
        return 2 + remaining;
      }
    } else {
      return Math.max(this.findLPSRecursive(string, start+1, end), this.findLPSRecursive(string, start, end-1));
    }
  }

  findLPSTopDown(string, start=0, end=(string.length-1)) {
    this.topDownCount++;
    if(start > end) return 0;
    if(start === end) return 1;
    if(this.map.has(this.getKey(start, end))) this.map.get(this.getKey(start, end));
    let result = 0;
    if(string[start] === string[end]) {
      let remaining = end - start - 1;
      if(remaining === this.findLPSTopDown(string, start+1, end-1)) {
        result = 2 + remaining;
      }
    } else {
      result = Math.max(this.findLPSTopDown(string, start+1, end), this.findLPSTopDown(string, start, end-1));
    }
    this.map.set(this.getKey(start, end), result);
    return result;
  }

  getKey(start, end) {
    return start + '-' + end;
  }

  findLPSBottomUp(string) {
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
  let lps = new LPS();
  lps.getLPS('MONO');
}

demo();