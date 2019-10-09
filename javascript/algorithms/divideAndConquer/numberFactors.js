'use strict'

class NumberFactor {

  constructor(factors) {
    this.factors = factors;
    this.map = new Map([[0,1], [1,1], [2,1], [3,2]]);
  }

  findNumberOfFactors(number) {
    if(this.map.has(number)) return this.map.get(number);
    let result = 0;
    for(let factor of this.factors) {
      result += this.findNumberOfFactors(number-factor);
    }
    this.map.set(number, result);
    return result;
  }

}

const demo = () => {
  let nf = new NumberFactor(new Array(1,3,4));
  console.log(`The number of factors for 4 is ${nf.findNumberOfFactors(4)}`);
  console.log(`The number of factors for 4 is ${nf.findNumberOfFactors(5)}`);
  console.log(`The number of factors for 4 is ${nf.findNumberOfFactors(20)}`);
}

demo();