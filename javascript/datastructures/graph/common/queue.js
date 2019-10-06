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

module.exports = Queue;