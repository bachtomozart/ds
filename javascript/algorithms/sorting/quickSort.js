'use strict';

const Sort = require('./sort');

class QuickSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    input = this.quickSort(input);
    console.log(`After Sort -> ${input}`);
    return input;
  }

  quickSort(input, start=0, end=input.length-1) {
    if(start >= end) return; 
    let pivot = this.pivot(input, start, end);
    this.quickSort(input, start, pivot-1);
    this.quickSort(input, pivot+1, end);
    return input;
  }

  pivot(input, start = 0, end=input.length-1) {
    let pivot = input[start];
    let swapIndex = start;
    for(let i=start+1;i<=end;i++) {
      if(pivot > input[i]) {
        swapIndex++;
        this.swap(input, swapIndex, i);
      }
    }
    this.swap(input, start, swapIndex);
    return swapIndex;
  }
}

const demo = () => {
  let s = new QuickSort();
  s.sort(s.input);
  // s.sort([1,10,50,2,14,99,100]);
  // s.pivot([4,8,2,1,5,7,6,3]);
}

demo();