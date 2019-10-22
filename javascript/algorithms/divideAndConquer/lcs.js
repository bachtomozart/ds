'use strict'

class LCS {
  constructor() {
  }

  getLCS(string1, string2) {
    let result = this.findLCS(string1, string2);
    console.log(`The LCS for ${string1} and ${string2} is ${result}`);
  }

  findLCS(input1, input2, pos1 = 0, pos2 = 0) {
    if(pos1 >= input1.length || pos2 >= input2.length) return 0;
    if(input1[pos1] === input2[pos2]) {
      return 1 + this.findLCS(input1, input2, pos1 + 1, pos2 + 1);
    }
    let different1 = this.findLCS(input1, input2, pos1 + 1, pos2);
    let different2 = this.findLCS(input1, input2, pos1, pos2 + 1);
    return Math.max(different1, different2);
  }

}

const demo = () => {
  let lcs = new LCS();
  lcs.getLCS('elephant', 'erephant');
}

demo();