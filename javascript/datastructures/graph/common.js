'use strict'

class Queue {
  constructor(size) {
    this.array = new Array(size);
  }

  enqueue(data) {
    this.array.push(data);
  }

  dequeue() {
    return this.array.shift();
  }
}

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

module.exports.Queue = Queue;
module.exports.Stack = Stack;