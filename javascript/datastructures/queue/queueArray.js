'use strict'

class Queue {
  constructor() {
    this.store = [];
  }

  enqueue(value) {
    this.store.push(value);
    return this.store;
  }

  dequeue(value) {
    return this.store.shift(value);
  }

  peek() {
    return this.store[0];
  }

  print() {
    console.log(this.store.reduce((acc,item) => acc + '\t' + '[' + item + ']', []));
  }

}

const demo = () => {
  let s = new Queue();
  s.enqueue(10);
  s.enqueue(20);
  s.enqueue(30);
  s.print();
  s.dequeue();
  s.print();
  s.dequeue();
  s.print();
}

demo();