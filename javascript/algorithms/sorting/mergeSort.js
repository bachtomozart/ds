'use strict';

const Sort = require('./sort');

class MergeSort extends Sort {
  sort(input) {
    console.log(`Before Sort -> ${input}`);
    input = this.mergeSort(input);
    console.log(`After Sort -> ${input}`);
    return input;
  }

  mergeSort(input) {
    if(input.length === 1) return input;
    let mid = Math.floor(input.length/2);
    let firstHalf = this.mergeSort(input.slice(0, mid));
    let secondHalf = this.mergeSort(input.slice(mid, input.length));
    return this.merge(firstHalf, secondHalf);
  }

  merge(arr1, arr2) {
    let output = [],
      i = 0,
      j = 0;
    while(i < arr1.length && j < arr2.length) {
      if(arr1[i] < arr2[j]) {
        output.push(arr1[i]);
        i++;
      } else {
        output.push(arr2[j]);
        j++;
      }
    }
    let arr1Remaining = arr1.slice(i, arr1.length);
    let arr2Remaining = arr2.slice(j, arr2.length);
    output = [...output,...arr1Remaining,...arr2Remaining];
    return output;
  }
}

const demo = () => {
  let s = new MergeSort();
  s.sort(s.input);
  // s.sort([1,10,50,2,14,99,100]);
  // s.merge([1,10,50], [2,14,99,100]);
}

demo();