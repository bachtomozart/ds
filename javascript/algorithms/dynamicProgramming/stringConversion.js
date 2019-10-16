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
    let result = bottomUp;
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
    for(let pos1 = 1; pos1 <= string1.length; pos1++) {
      for(let pos2 = 1; pos2 <= string2.length; pos2++) {
        this.bottomUpCount++;
        if(string1[pos1] === string2[pos2]) {
          this.array[pos1][pos2] = this.array[pos1-1][pos2-1];
        } else {
          this.array[pos1][pos2] = 1 + Math.min(this.array[pos1-1][pos2],this.array[pos1][pos2-1],this.array[pos1-1][pos2-1]);
        }
      }
    }
    this.printTwoDimensionalArray(string1, string2);
    return this.array[string1.length][string2.length];
  }

  getPos(pos1, pos2) {
    return pos1 + '-' + pos2;
  }

  initializeTwoDimensionalArray(string1, string2) {
    for(let i=0;i<=string1.length;i++) {
      this.array[i] = new Object();
      for(let j=0;j<=string2.length;j++) {
        this.array[i][j] = 0;
      }
    }
    this.initializeBaseCase(string1, string2);
    this.printTwoDimensionalArray(string1, string2);
  }

  initializeBaseCase(string1, string2) {
    for(let i=0;i<=string1.length;i++) {
      this.array[i][0] = i;
    }
    for(let j=0;j<=string2.length;j++) {
      this.array[0][j] = j;
    }
  }

  printTwoDimensionalArray(string1, string2) {
    console.log('-------------------------------');
    console.log('(-)\t(-)\t' + string2.split('').reduce((acc,item) => acc + '(' + item + ')\t', ''));
    for(let i=0;i<=string1.length;i++) {
      let string = '(' + (string1[i-1] || '-') + ')\t';
      for(let j=0;j<=string2.length;j++) {
        string += '[' + this.array[i][j] + ']\t';
      }
      console.log(string);
    }
    console.log('-------------------------------');
  }

  initializeBaseCaseInverted(string1, string2) {
    for(let i=string1.length;i>=0;i--) {
      this.array[i][string2.length] = string1.length-i;
    }
    for(let j=string2.length;j>=0;j--) {
      this.array[string1.length][j] = string2.length-j;
    }
  }

  printTwoDimensionalArrayInverted(string1, string2) {
    console.log('-------------------------------');
    console.log('(-)\t' + string2.split('').reduce((acc,item) => acc + '(' + item + ')\t', '') + '(-)');
    for(let i=0;i<=string1.length;i++) {
      let string = '(' + (string1[i] || '-') + ')\t';
      for(let j=0;j<=string2.length;j++) {
        string += '[' + this.array[i][j] + ']\t';
      }
      console.log(string);
    }
    console.log('-------------------------------');
  }

}

const demo = () => {
  let sc = new StringConversion();
  sc.getConversions('Table', 'Tablee');
}

demo();
