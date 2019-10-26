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

  minSubArrayLen2(nums, sum) {
    let total = 0;
    let start = 0;
    let end = 0;
    let minLen = Infinity;

    while (start < nums.length) {
      // if current window doesn't add up to the given sum then
      // move the window to right
      if(total < sum && end < nums.length){
        total += nums[end];
        end++;
      }
      // if current window adds up to at least the sum given then
      // we can shrink the window
      else if(total >= sum){
        minLen = Math.min(minLen, end-start);
        total -= nums[start];
        start++;
      }
      // current total less than required total but we reach the end, need this or else we'll be in an infinite loop
      else {
        break;
      }
    }

    return minLen === Infinity ? 0 : minLen;
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