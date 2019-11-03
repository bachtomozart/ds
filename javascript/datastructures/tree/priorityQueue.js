'use strict'

class PriorityQueue {

  constructor(comparator) {
    this.comparator = comparator;
    this.store = [];
  }

  peek() {
    return this.store[0];
  }

  enqueue(value) {
    this.store.push(value);
    this.heapifyUp();
  }

  heapifyUp(childPos = this.store.length - 1) {
    if(childPos === 0) return;
    let parentPos = this.getParentPos(childPos);
    if(!this.comparator(this.store[parentPos], this.store[childPos])) {
      this.swap(parentPos, childPos);
      this.heapifyUp(parentPos);
    }
    return;
  }

  dequeue() {
    let result = this.store.shift();
    this.heapifyDown();
    return result;
  }

  heapifyDown(parentPos = 0) {
    if(parentPos >= this.store.length) return;
    let leftPos = this.getLeftPos(parentPos);
    let rightPos = this.getRightPos(parentPos);
    if(!this.store[leftPos] && !this.store[rightPos]) {
      return;
    } else if (this.store[leftPos] && !this.store[rightPos]) {
      if(!this.comparator(this.store[parentPos], this.store[leftPos])) {
        this.swap(parentPos, leftPos);
        this.heapifyDown(leftPos);
      }
    } else if (!this.store[leftPos] && this.store[rightPos]) {
      if(!this.comparator(this.store[parentPos], this.store[rightPos])) {
        this.swap(parentPos, rightPos);
        this.heapifyDown(rightPos);
      }
    } else if(!this.comparator(this.store[parentPos], this.store[leftPos]) ||
    !this.comparator(this.store[parentPos], this.store[rightPos])) {
      if(this.comparator(this.store[leftPos],this.store[rightPos])) {
        this.swap(parentPos, leftPos);
        this.heapifyDown(leftPos);
      } else {
        this.swap(parentPos, rightPos);
        this.heapifyDown(rightPos);
      }
    }
  }

  getParentPos(childPos) {
    if(childPos % 2 === 1) return (childPos - 1) / 2;
    return (childPos - 2) / 2;
  }

  getLeftPos(parentPos) {
    return (2 * parentPos) + 1;
  }

  getRightPos(parentPos) {
    return (2 * parentPos) + 2;
  }

  swap(parentPos, childPos) {
    [this.store[parentPos], this.store[childPos]] = [this.store[childPos], this.store[parentPos]];
  }
}

class MinPriorityQueue extends PriorityQueue {
  constructor() {
    super((a,b) => a < b);
  }
}

class MaxPriorityQueue extends PriorityQueue {
  constructor() {
    super((a,b) => a > b);
  }
}

const demo = () => {
  let minPriorityQueue = new MinPriorityQueue();
  minPriorityQueue.enqueue(5);
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.enqueue(3);
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.enqueue(2);
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.enqueue(4);
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.enqueue(1);
  console.log(`${[...minPriorityQueue.store]}`);
  console.log(`--------`);
  minPriorityQueue.dequeue()
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.dequeue()
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.dequeue()
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.dequeue()
  console.log(`${[...minPriorityQueue.store]}`);
  minPriorityQueue.dequeue()
  console.log(`${[...minPriorityQueue.store]}`);
  console.log(`--------`);
  let maxPriorityQueue = new MaxPriorityQueue();
  maxPriorityQueue.enqueue(1);
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.enqueue(3);
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.enqueue(2);
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.enqueue(4);
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.enqueue(5);
  console.log(`${[...maxPriorityQueue.store]}`);
  console.log(`--------`);
  maxPriorityQueue.dequeue()
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.dequeue()
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.dequeue()
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.dequeue()
  console.log(`${[...maxPriorityQueue.store]}`);
  maxPriorityQueue.dequeue()
  console.log(`${[...maxPriorityQueue.store]}`);
  console.log(`--------`);
}

demo();

module.exports = PriorityQueue;