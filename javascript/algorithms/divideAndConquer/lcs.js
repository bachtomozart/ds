'use strict'

class LCS {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.visited = new Set();
    this.subsequence = new Array();
  }

  getLCS(string1, string2) {
    this.initialize();
    let result = this.findLCS(string1, string2);
    let lcsCharacters = this.subsequence.reduce((acc, item) => acc + item);
    console.log(`The LCS for ${string1} and ${string2} is ${result} with characters ${lcsCharacters}`);
  }

  findLCS(string1, string2) {
    if(!string1[0] || !string2[0]) return 0;
    let similar = 0, different1 = 0, different2 = 0;
    if(string1[0] === string2[0]) {
      if(!this.visited.has(string1[0])) {
        this.visited.add(string1[0]);
        this.subsequence.push(string1[0]);
      } 
      return 1 + this.findLCS(string1.slice(1), string2.slice(1));
    }
    different1 = this.findLCS(string1.slice(1), string2);
    different2 = this.findLCS(string1, string2.slice(1));
    return Math.max(different1, different2);
  }
}

const demo = () => {
  let lcs = new LCS();
  lcs.getLCS('elephant', 'erephant');
  lcs.getLCS('Governmentofindia', 'Govindarajan');
}

demo();