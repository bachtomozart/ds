'use strict';

const Sort = require('./sort');

class InsertionSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    console.log(`After Sort -> ${input}`);
    return input;
  }
}

const demo = () => {
  let s = new InsertionSort();
  s.sort(s.input);
}

demo();