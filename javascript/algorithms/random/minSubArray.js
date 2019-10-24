'use strict'

class MinSubArray {
  constructor() {
    this.map = new Map();
  }

  getMSA(inputs, avg) {
    let result = this.minSubArrayLen(inputs, avg);
    console.log(`The MSA for ${JSON.stringify(inputs)} is ${result}`);
  }

  minSubArrayLen(inputs, sum) {
    let maxSum = Infinity,
      maxSize = Infinity;
    let tempSum = inputs[0],
      tempSize = 1;
    let i = 0,
      j = 0;
    while (j < inputs.length) {
      if (tempSum >= sum) {
        if (tempSize <= maxSize) {
          maxSize = tempSize;
          maxSum = tempSum;
          tempSum -= inputs[i];
          tempSize -= 1;
          i++;
        } else {
          j++;
        }
      } else {
        tempSum += inputs[++j];
        tempSize += 1;
      }
    }
    return maxSize === Infinity ? 0 : maxSize;
  }
}

const demo = () => {
  let msa = new MinSubArray();
  // msa.getMSA([1, 2, 5, 7, 9], 6);
  // msa.getMSA([2,3,1,2,4,3], 7);
  // msa.getMSA([2,1,6,5,4], 9);
  msa.getMSA([3,1,7,11,2,9,8,21,62,33,19], 52);
}

demo();