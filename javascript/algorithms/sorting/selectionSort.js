'use strict';

const Sort = require('./sort');

class SelectionSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    for(let i=0;i<input.length;i++) {
      let smallest = i;
      for(let j = i+1; j<input.length;j++) {
        if(input[j] < input[smallest])
          smallest = j;
      }
      if(i !== smallest) this.swap(input, i, smallest);
    }
    console.log(`After Sort -> ${input}`);
    return input;
  }
}

const demo = () => {
  let s = new SelectionSort();
  s.sort(s.input);
}

demo();