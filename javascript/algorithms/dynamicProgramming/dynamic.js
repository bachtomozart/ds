'use strict'

class Dynamic {
  constructor() {
    this.recursiveCount = 0;
    this.topDownCount = 0;
    this.bottomUpCount = 0;
  }

  printCounts() {
    console.log(`Recursive - ${this.recursiveCount}, TopDown - ${this.topDownCount}, BottomUp = ${this.bottomUpCount}`);
  }
}

module.exports = Dynamic;