'use strict'

class NumberFactors {

  constructor(factors, map) {
    this.factors = factors;
    this.map = map;
    this.ways = Array.from(map.values());
  }

  getNumberFactors(number) {
    // let result = this.numberFactors(number);
    let result = this.findNumberFactors(number);
    console.log(`The number factors for ${number} is ${result}`);
  }

  numberFactors(number) {
    if(this.map.has(number)) return this.map.get(number);
    let result = 0;
    for(let factor of this.factors) {
      result += this.numberFactors(number - factor);
    }
    this.map.set(number, result);
    return result;
  }

  findNumberFactors(number) {
    if(this.map.has(number)) return this.ways[number];
    for(let i = this.ways.length; i <= number; i++) {
      let result = 0;
      for(let factor of this.factors) {
        result += this.ways[(i-factor)];
      }
      this.ways.push(result);
      this.map.set(i, result);
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
  nf.getNumberFactors(5);
  nf.getNumberFactors(10);
}

demo();