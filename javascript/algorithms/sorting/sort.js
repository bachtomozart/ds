'use strict'

class Sort {
  constructor() {
    this.input = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
  }

  swap(input, pos1, pos2) {
    [input[pos2], input[pos1]] = [input[pos1], input[pos2]];
  }

}

module.exports = Sort;