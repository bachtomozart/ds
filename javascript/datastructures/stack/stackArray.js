'use strict'

class Stack {
  constructor() {
    this.store = [];
  }

  push(value) {
    this.store.push(value);
    return this.store;
  }

  pop(value) {
    return this.store.pop(value);
  }

  peek() {
    return this.store[0];
  }

  print() {
    console.log(this.store.reduce((acc,item) => acc + '\t' + '[' + item + ']', []));
  }

}

const demo = () => {
  let s = new Stack();
  s.push(10);
  s.push(20);
  s.push(30);
  s.print();
  s.pop();
  s.print();
  s.pop();
  s.print();
}

demo();