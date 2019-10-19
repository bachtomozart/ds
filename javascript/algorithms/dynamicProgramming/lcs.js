'use strict'

const Dynamic = require('./dynamic');

class LCS extends Dynamic {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.map = new Map();
    this.array = new Object();
    this.visited = new Set();
  }

  getLCS(string1, string2) {
    this.initialize();
    let recursive = this.findLCSRecursive(string1, string2);
    let topDown = this.findLCSTopDown(string1, string2);
    let bottomUp = this.findLCSBottomUp(string1, string2);
    let result = topDown;
    console.log(`The LCS for ${string1} and ${string2} is ${result}`);
    this.printCounts();
  }

  findLCSRecursive(string1, string2, pos1=0, pos2=0) {
    this.recursiveCount++;
    if(pos1 >= string1.length || pos2 >= string2.length) return 0;
    if(string1[pos1] === string2[pos2]) {
      return 1 + this.findLCSRecursive(string1, string2, pos1+1, pos2+1);
    } else {
      let different1 = this.findLCSRecursive(string1, string2, pos1, pos2+1);
      let different2 = this.findLCSRecursive(string1, string2, pos1+1, pos2);
      return Math.max(different1, different2);
    }
  }

  findLCSTopDown(string1, string2, pos1=0, pos2=0) {
    this.topDownCount++;
    if(this.map.has(this.getPos(pos1, pos2))) return this.map.get(this.getPos(pos1, pos2));
    if(pos1 >= string1.length || pos2 >= string2.length) return 0;
    let result = 0;
    if(string1[pos1] === string2[pos2]) {
      result = 1 + this.findLCSTopDown(string1, string2, pos1+1, pos2+1);
    } else {
      let different1 = this.findLCSTopDown(string1, string2, pos1, pos2+1);
      let different2 = this.findLCSTopDown(string1, string2, pos1+1, pos2);
      result = Math.max(different1, different2);
    }
    this.map.set(this.getPos(pos1, pos2), result);
    return result;
  }

  getPos(pos1, pos2) {
    return pos1 + '-' + pos2;
  }

  findLCSBottomUp(string1, string2) {
    this.initializeArray(string1, string2);
    for(let pos1=(string1.length-1); pos1>=0; pos1--) {
      for(let pos2=(string2.length-1); pos2>=0; pos2--) {
        this.bottomUpCount++;
        if(string1[pos1] === string2[pos2]) {
          this.array[pos1][pos2] = Math.max((1 + this.array[pos1+1][pos2+1]), this.array[pos1+1][pos2], this.array[pos1][pos2+1]);
        } else {
          this.array[pos1][pos2] = Math.max(this.array[pos1+1][pos2], this.array[pos1][pos2+1])
        }
      }
    }
    this.printArray(string1, string2);
    return this.array[0][0]
  }

  initializeArray(string1, string2) {
    this.array = new Object();
    for(let i=0;i<=string1.length;i++) {
      this.array[i] = new Object();
      for(let j=0;j<=string2.length;j++) {
        if(j===string2.length) {
          // base case
          this.array[i][j] = 0;
        } else if (i === string1.length) {
          // base case
          this.array[i][j] = 0;
        } else {
          // bottomUp case
          this.array[i][j] = 0;
        }
      }
    }
    this.printArray(string1, string2);
  }

  printArray(string1, string2) {
    console.log('---------------------------');
    console.log('(-)\t' + string2.split('').reduce((acc,item) => acc + '(' + item + ')\t', '') + '(-)\t')
    for(let i=0;i<=string1.length;i++) {
      let string = '(' + (string1[i] || '-') + ')\t';
      for(let j=0;j<=string2.length;j++) {
        string += '[' + this.array[i][j] + ']\t';
      }
      console.log(string);
    }
    console.log('---------------------------');
  }

}

const demo = () => {
  let lcs = new LCS();
  lcs.getLCS('Teable', 'Teobee');
}

demo();