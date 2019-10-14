'use strict'

class NumberFactors {

  constructor(factors, map) {
    this.factors = factors;
    this.map = new Map(map);
    this.bottomUpMap = new Map(map);
    this.ways = Array.from(map.values());
    this.recursiveCount = 0;
    this.topDownCount = 0;
    this.bottomUpCount = 0;
  }

  getNumberFactors(number) {
    let recursive = this.numberFactorsRecursive(number);
    let topDown = this.numberFactorsTopDown(number);
    let bottomUp = this.numberFactorsBottomUp(number);
    let result = bottomUp;
    console.log(`The number factors for ${number} is ${result}`);
    console.log(`Recursive - ${this.recursiveCount}, TopDown - ${this.topDownCount}, BottomUp - ${this.bottomUpCount}`);
  }

  numberFactorsRecursive(number) {
    this.recursiveCount++;
  }

  numberFactorsTopDown(number) {
    this.topDownCount++;
    if(this.map.has(number)) return this.map.get(number);
    let result = 0;
    for(let factor of this.factors) {
      result += this.numberFactorsTopDown(number - factor);
    }
    this.map.set(number, result);
    return result;
  }

  numberFactorsBottomUp(number) {
    if(this.bottomUpMap.has(number)) return this.ways[number];
    for(let i = this.ways.length; i <= number; i++) {
      this.bottomUpCount++;
      let result = 0;
      for(let factor of this.factors) {
        result += this.ways[(i-factor)];
      }
      this.ways.push(result);
      this.bottomUpMap.set(i, result);
    }
    return this.ways[number];
  }

}

const demo = () => {
  let nf = new NumberFactors(new Array(1,3,4), new Map([
    [0,1],
    [1,1],
    [2,1],
    [3,2]
  ]));
  nf.getNumberFactors(10);
}

demo();