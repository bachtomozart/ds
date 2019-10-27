'use strict';

const Sort = require('./sort');

class BubbleSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    let noSwap = false;
    for (let i = input.length; i > 0; i--) {
      for (let j = 0; j < i - 1; j++) {
        if (input[j] > input[j+1]) {
          this.swap(input, j, j+1);
          noSwap = false;
        }
      }
      if(noSwap) break;
    }
    console.log(`After Sort -> ${input}`);
    return input;
  }
}

const demo = () => {
  let s = new BubbleSort();
  s.sort(s.input);
}

demo();