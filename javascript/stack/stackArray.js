'use strict';

class StackArray {

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

const demoStackArray = () => {
  let stackk = new StackArray(5);
  stackk.push(1);
  stackk.printAll();
  stackk.push(2);
  stackk.printAll();
  stackk.push(3);
  stackk.printAll();
  stackk.pop();
  stackk.printAll();
  stackk.pop();
  stackk.printAll();
  stackk.pop();
  stackk.printAll();
  stackk.pop();
  stackk.printAll();
}

export { StackArray, demoStackArray }