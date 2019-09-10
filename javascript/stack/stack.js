'use strict';

class Node {
  constructor(data) {
    this.data = data;
  }
}

class Stack {

  constructor(size) {
    this.size = size;
    this.stack = [];
    this.top = -1;
    this.create(size);
  }
  create(size) {
    for(let i=0;i<size;i++) {
      this.stack.push(null);
    }
  }

  push(data) {
    if (!this.isFull()) {
      console.log(`PUSH - top -> ${this.top}, data -> ${data}`)
      this.top++;
      this.stack[this.top] = data;
    } else {
      console.log('PUSH - Cannot add ' + data + ' since stack is full');
    }
  }

  pop() {
    if(this.isEmpty()) {
      console.log('POP - Cannot remove - Nothing to pop since stack is empty');
    } else {
      console.log(`POP - top -> ${this.top}`);
      this.stack[this.top] = null;
      this.top--;
    }
  }

  peek() {
    if(this.isEmpty()) {
      console.log('Nothing to peek since stack is empty');
    } else {
      console.log('The top of the stack is top[' + this.stack[this.top] + ']');
    }
  }

  isEmpty() {
    if(this.top >= 0) {
      console.log("The stack is not empty");
      return false;
    } else {
      console.log("The stack is empty");
      return true;
    }
  }

  isFull() {
    if (this.top < this.size-1) {
      console.log("The stack is not full");
      return false;
    } else {
      console.log("The stack is full");
      return true;
    }
  }

  size() {
    console.log('The size of the stack is ' + this.size);
  }  

  printAll() {
    console.log('=======');
    console.log('STACK');
    let output = this.stack.reduceRight((acc, item) => { return acc + '[' + item + ']\n' }, []);
    console.log(output);
    console.log('=======');
  }
}


let stack = new Stack(5);
stack.push(1);
stack.printAll();
stack.push(2);
stack.printAll();
stack.push(3);
stack.printAll();
stack.pop();
stack.printAll();
stack.pop();
stack.printAll();
stack.pop();
stack.printAll();
stack.pop();
stack.printAll();