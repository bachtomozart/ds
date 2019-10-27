'use strict';

const Sort = require('./sort');

class InsertionSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    for (let i = 1; i < input.length; i++) {
      let currentVal = input[i];
      for (var j = i - 1; j >= 0 && input[j] > currentVal; j--) {
        input[j+1] = input[j];
      }
      input[j + 1] = currentVal;
    }
    console.log(`After Sort -> ${input}`);
    return input;
  }
}

const demo = () => {
  let s = new InsertionSort();
  s.sort(s.input);
}

demo();