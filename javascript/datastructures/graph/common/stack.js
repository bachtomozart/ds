'use strict'

class Stack {
  constructor(size) {
    this.array = new Array(size);
  }

  push(data) {
    this.array.push(data);
  }

  pop(data) {
    return this.array.pop();
  }
}

module.exports = Stack;