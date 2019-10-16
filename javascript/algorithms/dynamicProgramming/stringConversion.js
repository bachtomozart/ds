'use strict'

const Dynamic = require('./dynamic');

class StringConversion extends Dynamic {

  constructor() {
    super();
    this.map = new Map();
    this.array = new Object();
  }

  getConversions(string1, string2) {
    let recursive = this.conversionsRecursive(string1, string2);
    let topDown = this.conversionsTopDown(string1, string2);
    let bottomUp = this.conversionsBottomUp(string1, string2);
    let result = topDown;
    console.log(`The min converstions for ${string1} and ${string2} is ${result}`);
    this.printCounts();
  }

  conversionsRecursive(string1, string2, pos1 = 0, pos2 = 0) {
    this.recursiveCount++;
    if(pos1 >= string1.length)
      return string2.length - pos2;

    if(pos2 >= string2.length)
      return string1.length - pos1;

    if(string1[pos1] === string2[pos2]) 
      return this.conversionsRecursive(string1, string2, pos1 + 1, pos2 + 1);

    let insertion = 1 + this.conversionsRecursive(string1, string2, pos1 + 1, pos2);
    let deletion = 1 + this.conversionsRecursive(string1, string2, pos1, pos2 + 1);
    let replacement = 1 + this.conversionsRecursive(string1, string2, pos1 + 1, pos2 + 1);
    return Math.min(insertion, deletion, replacement);
  }

  conversionsTopDown(string1, string2, pos1 = 0, pos2 = 0) {
    this.topDownCount++;

    if(this.map.has(this.getPos(pos1,pos2))) 
      return this.map.get(this.getPos(pos1, pos2));

    if(pos1 >= string1.length)
      return string2.length - pos2;

    if(pos2 >= string2.length)
      return string1.length - pos1;

    if(string1[pos1] === string2[pos2]) 
      return this.conversionsTopDown(string1, string2, pos1 + 1, pos2 + 1);

    let insertion = 1 + this.conversionsTopDown(string1, string2, pos1 + 1, pos2);
    let deletion = 1 + this.conversionsTopDown(string1, string2, pos1, pos2 + 1);
    let replacement = 1 + this.conversionsTopDown(string1, string2, pos1 + 1, pos2 + 1);
    let result = Math.min(insertion, deletion, replacement);

    this.map.set(this.getPos(pos1,pos2), result);

    return result;
  }

  conversionsBottomUp(string1, string2, pos1 = 0, pos2 = 0) {
    this.initializeTwoDimensionalArray(string1, string2);
    for(let pos1 = (string1.length - 1); pos1 >= 0; pos1--) {
      for(let pos2 = (string2.length - 1); pos2 >= 0; pos2--) {
        this.bottomUpCount++;
        if(string1[pos1] === string2[pos2]) {
          this.array[pos1][pos2] = Math.min(this.array[pos1+1][pos2], this.array[pos1][pos2+1], this.array[pos1+1][pos2+1]);
        } else {
          let insertion = 1 + (this.array[pos1+1][pos2] || 0);
          let deletion = 1 + (this.array[pos1][pos2+1] || 0);
          let replacement = 1 + (this.array[pos1+1][pos2+1] || 0);
          this.array[pos1][pos2] = Math.min(insertion, deletion, replacement);
        }
      }
    }
    this.printTwoDimensionalArray(string1, string2);
    return this.array[0][0];
  }

  getPos(pos1, pos2) {
    return pos1 + '-' + pos2;
  }

  initializeTwoDimensionalArray(string1, string2) {
    for(let i=0;i<=(string1.length+1);i++) {
      this.array[i] = new Object();
      for(let j=0;j<=(string2.length+1);j++) {
        if (i > string1.length) {
          this.array[i][j] = i;
        } else if(j > string2.length) {
          this.array[i][j] = j;
        } else {
          this.array[i][j] = null;
        }
      }
    }
    this.printTwoDimensionalArray(string1, string2);
  }

  printTwoDimensionalArray(string1, string2) {
    console.log('-----------------------');
    for(let i=0;i<string1.length;i++) {
      let string = '';
      for(let j=0;j<string2.length;j++) {
        string += '[' + this.array[i][j] + ']\t';
      }
      console.log(string);
    }
    console.log('-----------------------');
  }

}

const demo = () => {
  let sc = new StringConversion();
  sc.getConversions('Table', 'Tgable');
}

demo();
