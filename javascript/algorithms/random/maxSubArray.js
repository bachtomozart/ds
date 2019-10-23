'use strict'

class MaxSubArray {

  constructor() {

  }

  getMSA(input, num) {
    let result = this.findMSA(input, num);
    console.log(`The Max sum for ${num} in ${JSON.stringify(input)} is ${result}`);
  }

  findMSA(input, num) {
    if (num > input.length) return null;
    let globalMax = 0,
      currentMax = 0;
    for (let i = 0; i < num; i++) {
      currentMax += input[i];
    }
    globalMax = currentMax;
    for (let i = num; i < input.length; i++) {
      currentMax = currentMax - input[i - num] + input[i];
      globalMax = Math.max(currentMax, globalMax);
    }
    return globalMax;
  }

}

const demo = () => {
  let msa = new MaxSubArray();
  msa.getMSA(new Array(1, 2, 5, 2, 8, 1, 5), 2); // 10
  msa.getMSA(new Array(1, 2, 5, 2, 8, 1, 5), 4); // 17
  msa.getMSA(new Array(4, 2, 1, 6), 1); // 6
  msa.getMSA(new Array(4, 2, 1, 6, 2), 4); // 13
  msa.getMSA(new Array(), 4); // null
}

demo();