'use strict'

class SumZero {

  constructor() { 
    this.memoize = new Map();
    this.recursiveCounter = 0;
    this.topDownCounter = 0;
  }

  getZeroPair(input) {
    let result1 = this.findZeroPair1(input);
    let result2 = this.findZeroPair2(input);
    let result3 = this.findZeroPair3(input);
    console.log(`A zero pair for ${JSON.stringify(input)}` + (result1 && result1.length ? ` has been found - ${JSON.stringify(result1)}` : ` cannot be found`));
    console.log(`A zero pair for ${JSON.stringify(input)}` + (result2 && result2.length ? ` has been found - ${JSON.stringify(result2)}` : ` cannot be found`));
    console.log(`A zero pair for ${JSON.stringify(input)}` + (result3 && result3.length ? ` has been found - ${JSON.stringify(result3)}` : ` cannot be found`));
    console.log(`Recusions -> ${this.recursiveCounter}, TopDowns -> ${this.topDownCounter}`);
  }

  findZeroPair1(input) {
    let i = 0, j = (input.length-1);
    while(i < j) {
      let sum = input[i] + input[j];
      if(sum === 0) { 
        return new Array(input[i], input[j]) 
      } else if (sum < 0) {
        // left is smaller than right, so increment left by 1
        i++;
      } else {
        // right is bigger than left, so decrement right by 1
        j--;
      }
    }
    return new Array();
  }

  findZeroPair2(input, i=0, j=(input.length-1)) {
    this.recursiveCounter++;
    // console.log(`i-> ${i}-${input[i]}, j -> ${j}-${input[j]}`);
    if(i >= j) return new Array();
    let sum = input[i] + input[j];
    if(sum === 0) {
      return new Array(input[i], input[j]);
    } else if(sum < 0) {
      // left is smaller than right, so increment left by 1
      return this.findZeroPair2(input, i+1, j);
    } else {
      // right is bigger than left, so decrement right by 1
      return this.findZeroPair2(input, i, j-1);
    }
  }

  findZeroPair3(input, i=0, j=(input.length-1)) {
    if(this.memoize.has(this.getKey(i,j))) return this.memoize.get(this.getKey(i,j));
    this.topDownCounter++;
    if(i >= j) return new Array();
    let sum = input[i] + input[j];
    if(sum === 0) return new Array(input[i], input[j]);
    if(sum < 0) {
      // left is smaller than right, so increment left by 1
      let different1 = this.findZeroPair3(input, i+1, j);
      this.memoize.set(this.getKey(i,j), different1)
    } else {
      // right is bigger than left, so decrement right by 1
      let different2 = this.findZeroPair3(input, i, j-1);
      this.memoize.set(this.getKey(i,j), different2)
    }
    return this.memoize.get(this.getKey(i,j));
  }

  getKey(i,j) {
    return i + '-' + j;
  }
}

const demo = () => {
  let sz = new SumZero();
  sz.getZeroPair(new Array(-3,-2,-1,0,1,2,3,4));
}

demo();