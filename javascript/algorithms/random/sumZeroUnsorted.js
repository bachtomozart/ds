'use strict'

class SumZeroUnsorted {

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
    let map = new Map();
    for(let item of input) {
      if(map.has(item)) return new Array(item, map.get(item));
      map.set(-item, item);
    }
    return new Array();
  }

  // THis is actually a workable solution for unsorted array, but wasteful for sorted array
  findZeroPair2(input, i=0,j=(input.length-1)) {
    this.recursiveCounter++;
    // console.log(`i-> ${i}-${input[i]}, j -> ${j}-${input[j]}`);
    if(i >= j) return new Array();
    let sum = input[i] + input[j];
    if(sum === 0) return new Array(input[i], input[j]);
    let different1 = this.findZeroPair2(input, i+1, j);
    let different2 = this.findZeroPair2(input, i, j-1);
    if(different1.length) return different1;
    return different2;
  }

  // THis is actually a workable solution for unsorted array, but wasteful for sorted array
  findZeroPair3(input, i=0,j=(input.length-1)) {
    if(this.memoize.has(this.getKey(i,j))) return this.memoize.get(this.getKey(i,j));
    this.topDownCounter++;
    if(i >= j) return new Array();
    let sum = input[i] + input[j];
    if(sum === 0) return new Array(input[i], input[j]);
    let different1 = this.findZeroPair3(input, i+1, j);
    let different2 = this.findZeroPair3(input, i, j-1);
    different1.length ? this.memoize.set(this.getKey(i,j), different1) : this.memoize.set(this.getKey(i,j), different2);
    return this.memoize.get(this.getKey(i,j));
  }

  getKey(i,j) { 
    return i + '-' + j; 
  }

}

const demo = () => {
  let szu = new SumZeroUnsorted();
  szu.getZeroPair(new Array(-3,-2,-1,0,1,2,3,4));
}

demo();