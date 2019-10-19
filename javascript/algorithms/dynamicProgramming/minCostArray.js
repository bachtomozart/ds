'use strict'

const Dynamic = require('./dynamic');

class MinCostArray extends Dynamic {

  constructor() {
    super()
    this.initialize();
  }

  initialize() {
    this.array = new Object();
    this.tdArray = new Object();
  }

  getMCA(array) {
    let recursive = this.findMCARecursive(array);
    this.initializeTDArray(array);
    let topDown = this.findMCATopDown(array);
    let bottomUp = this.findMCABottomUp(array);
    let result = bottomUp;
    console.log(`The MCA is ${result}`);
    this.printCounts();
  }

  findMCARecursive(array, i=0, j=0) {
    this.recursiveCount++;
    if(i >= array.length || j >= array.length) return Infinity;
    if(i === (array.length-1) && j === (array.length-1)) return array[i][j];
    let right = array[i][j] + this.findMCARecursive(array, i, j+1);
    let down = array[i][j] + this.findMCARecursive(array, i+1, j);
    return Math.min(right, down);
  }

  findMCATopDown(array, i=0, j=0) {
    this.topDownCount++;
    if(this.tdArray[i][j]) return this.tdArray[i][j];
    if(i >= array.length || j >= array.length) return Infinity;
    if(i === (array.length-1) && j === (array.length-1)) return array[i][j];
    let right = array[i][j] + this.findMCATopDown(array, i, j+1);
    let down = array[i][j] + this.findMCATopDown(array, i+1, j);
    let result = Math.min(right, down);
    this.tdArray[i][j] = result;
    return result;
  }

  initializeTDArray(input) {
    this.tdArray = new Object();
    for(let i=0;i<=input.length;i++) {
      this.tdArray[i] = new Object();
      for(let j=0;j<=input.length;j++) {
        this.tdArray[i][j] = null;
      }
    }
  }

  findMCABottomUp(input) {
    this.initializeArray(input);
    for(let i=(input.length-1);i>=0;i--) {
      for(let j=(input.length-1);j>=0;j--) {
        this.bottomUpCount++;
        let right = this.array[i][j] + this.array[i][j+1];
        let down = this.array[i][j] + this.array[i+1][j];
        if(right === Infinity && down === Infinity) {
          this.array[i][j] = this.array[i][j];
        } else if(right === Infinity && down !== Infinity) {
          this.array[i][j] = down;
        } else if(right !== Infinity && down === Infinity) {
          this.array[i][j] = right;
        } else {
          this.array[i][j] = Math.min(right, down);
        }
      }
    }
    this.printArray(input);
    return this.array[0][0];
  }

  initializeArray(input) {
    this.array = new Object();
    for(let i=0;i<=input.length;i++) {
      this.array[i] = new Object();
      for(let j=0;j<=input.length;j++) {
        if(i === input.length) {
          this.array[i][j] = Infinity;
        } else if (j === input.length) {
          this.array[i][j] = Infinity;
        } else {
          this.array[i][j] = input[i][j];
        }
      }
    }
    this.printArray(input);
  }

  printArray(input) {
    console.log('-----------------------');
    for(let i=0;i<=input.length;i++) {
      let string = '';
      for(let j=0;j<=input.length;j++) {
        string += '[' + (this.array[i][j] !== Infinity ? this.array[i][j] : 'I') + ']\t';
      }
      console.log(string);
    }
    console.log('-----------------------');
  }

}

const demo = () => {
  let mca = new MinCostArray();
  mca.getMCA([
    [4,7,8,6,4],
    [6,7,3,9,2],
    [3,8,1,2,4],
    [7,1,7,3,7],
    [2,9,8,9,3]
  ]);
}

demo();