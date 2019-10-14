'use strict'

import { uptime } from "os";

class QueueArray {
  constructor(size) {
    this.size = 0;
    this.queue = [];
    this.start = -1;
    this.end = -1;
    this.create(size);
  }

  create(size) {
    this.size = size;
    for(let i=0;i<size;i++) {
      this.queue[i] = null;
    }
  }

  destroy() {
    this.queue = [];
  }

  recreate(size) {
    this.destroy();
    this.create(size);
  }

  enQueue(data) {
    if(this.isEmpty()) {
      console.log('ENQUEUE - queue is empty, adding first item');
      console.log(`start - ${this.start}, end = ${this.end}`);
      this.start++;
      this.end++;
      this.queue[this.start] = data;
    } else if (this.isFull()) {
      console.log('ENQUEUE - queue is full, cannot add anymore');
      console.log(`start - ${this.start}, end = ${this.end}`);
    } else {
      console.log('ENQUEUE - queue is right, adding item');
      console.log(`start - ${this.start}, end = ${this.end}`);
      let newEnd = this.incrementPosition(this.end);
      this.end = newEnd;
      this.queue[this.end] = data;
    }
    console.log(`start - ${this.start}, end = ${this.end}`);
  }

  deQueue() {
    if(this.isEmpty()) {
      console.log('DEQUEUE - queue is empty, cannot remove');
      console.log(`start - ${this.start}, end = ${this.end}`);
    } else {
      if(this.start === this.end) {
        // The last element in the queue
        console.log('DEQUEUE - queue is about to become empty, removing item');
        console.log(`start - ${this.start}, end = ${this.end}`);
        this.queue[this.start] = null;
        this.start = -1;
        this.end = -1;
      } else {
        console.log('DEQUEUE - queue is right, removing item');
        console.log(`start - ${this.start}, end = ${this.end}`);
        let newStart = this.incrementPosition(this.start);
        this.queue[this.start] = null;
        this.start = newStart;
      }
    }
    console.log(`start - ${this.start}, end = ${this.end}`);
  }

  peekQueue() {
    if(this.isEmpty()) {
      console.log('PEEK QUEUE - Cannot peek since queue is empty');
    } else {
      console.log('Value at the start of the queue -> ' + this.queue[this.start]);
    }
  }

  isEmpty() {
    if(this.start === -1 && this.end === -1) {
      return true;
    } else {
      return false;
    }
  }

  isFull() {
    if(this.start === 0 && this.end === this.size-1) {
      return true;
    } else if (this.end < this.start && this.end === this.start-1) {
      return true;
    } else {
      return false;
    }
  }

  printAll() {
    console.log('\n=======');
    let tempArray = this.queue.map((item) => '[' + item + ']');
    let output = 'QUEUE => ' + tempArray.join(' - ');
    console.log(output);
    console.log('=======\n');
  }

  incrementPosition(pos) {
    return pos+1 > this.size-1 ? 0 : pos+1
  }
}

const demoQueueArray = () => {
  let queue = new QueueArray(5);
  queue.enQueue(1);
  queue.printAll();
  queue.enQueue(2);
  queue.printAll();
  queue.enQueue(3);
  queue.printAll();
  queue.peekQueue();
  queue.deQueue();
  queue.printAll();
  queue.deQueue();
  queue.printAll();
  queue.deQueue();
  queue.printAll();
  queue.peekQueue();
}

export { QueueArray, demoQueueArray }