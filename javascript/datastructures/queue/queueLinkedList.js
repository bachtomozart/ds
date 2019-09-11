'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class QueueLinkedList {
  constructor(size) {
    this.size = size;
    this.start = null;
    this.end = null;
    this.count = 0;
  }

  enQueue(data) {
    if(this.isEmpty()) {
      console.log('EnQueue - Queue is empty, adding first item');
      let node = new Node(data);
      this.start = node;
      this.end = node;
    } else if (this.isFull()) {
      console.log('EnQueue - Queue is full, cannot add any more');
    } else {
      console.log('EnQueue - Queue is right, adding item');
      let node = new Node(data);
      let end = this.end;
      end.next = node;
      this.end = node;
    }
    this.count++;
  }

  deQueue() {
    if(this.isEmpty()) {
      console.log('DeQueue - Queue is empty, cannot remove any more');
    } else {
      console.log('DeQueue - Queue is right, removing item');
      let temp = this.start;
      this.start = temp.next;
      temp = null;
      this.count--;
    }
    if(this.count === 0) {
      this.start = null;
      this.end = null;
    }
  }

  peekQueue() {
    if(this.isEmpty()) {
      console.log('Peek - There is nothing to peek, queue is empty');
    } else {
      console.log('Value at the start of the queue is -> ' + this.start.data);
    }
  }

  isEmpty() {
    if(this.count > 0) {
      console.log('The queue is not empty');
      return false;
    } else {
      console.log('The queue is empty')
      return true;
    }
  }

  isFull() {
    if(this.count < this.size) {
      console.log('The queue is not full');
      return false;
    } else {
      console.log('The queue is full');
      return true;
    }
  }

  printAll() {
    console.log('=======');
    console.log('QUEUE');
    let current = this.start, tempArray = [];
    while(current) {
      tempArray.push('[' + current.data + ']');
      current = current.next;
    }
    // let output = tempArray.reduce((acc, item) => { return acc + '[' + item + '] - ' }, []);
    let output = tempArray.join(' - ');
    console.log(output);
    console.log('=======');
  }
}

const demoQueueLinkedList = () => {
  let queue = new QueueLinkedList(5);
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

export { QueueLinkedList, demoQueueLinkedList }