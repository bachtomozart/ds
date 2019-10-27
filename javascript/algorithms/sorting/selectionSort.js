'use strict';

const Sort = require('./sort');

class SelectionSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    console.log(`After Sort -> ${input}`);
    return input;
  }
}

const demo = () => {
  let s = new SelectionSort();
  s.sort(s.input);
}

demo();