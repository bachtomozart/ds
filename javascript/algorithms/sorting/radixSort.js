'use strict';

const Sort = require('./sort');

class RadixSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    let maxRun = this.mostDigits(input);
    let buckets = Array.from({length:10}, () => []);
    let currentRun = 0;
    while(currentRun < maxRun) {
      for(let i=0;i<input.length;i++) {
        let placeDigit = this.getDigit(input[i], currentRun);
        buckets[placeDigit].push(input[i]);
      }
      input = [].concat(...buckets);
      buckets = Array.from({length:10}, () => []);
      currentRun++;
    }
    console.log(`After Sort -> ${input}`);
    return input;
  }

  mostDigits(input) {
    let max = 0;
    for (let i = 0; i < input.length; i++) {
      max = Math.max(max, this.digitCount(input[i]));
    }
    return max;
  }

  digitCount(number) {
    if (number === 0) return 1;
    return Math.floor(Math.log10(Math.abs(number))) + 1;
  }

  getDigit(number, place) {
    return Math.floor(Math.abs(number) / Math.pow(10, place)) % 10;
  }

  myGetDigit(number, place) {
    let mod = number % Math.pow(10, place);
    let result = Number(mod.toString()[0]);
    return result;
  }
}

const demo = () => {
  let s = new RadixSort();
  s.sort(s.input);
  // s.sort([1,10,50,2,14,99,100]);
  // s.getDigit(1574, 0);
  // s.getDigit(1574, 1);
  // s.getDigit(1574, 2);
  // s.getDigit(1574, 3);
  // s.digitCount(1574);
  // s.mostDigits([1475, 834754, 3, 535, 234, 34, 23556]);
}

demo();