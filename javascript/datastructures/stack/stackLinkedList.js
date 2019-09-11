'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
  }
}

class StackLinkedList {
  constructor (size) {
    this.size = size;
    this.top = null;
    this.count = 0;
  }

  push(data) {
    if(this.size) {
      if(this.isFull()) {
        console.log('PUSH - The stack is full cannot push any more into stack');
      } else {
        let newNode = new Node(data);
        if(this.top) {
          let temp = this.top;
          newNode.prev = temp;
          this.top = newNode;
        } else {
          this.top = newNode;
        }
        this.count++;
      }
    } else {
      this.warnUnInitialized();
    }
  }

  pop() {
    if(this.size) {
      if(this.isEmpty()) {
        console.log('POP - There is nothing to pop, since the stack is empty');
      } else {
        let prev = this.top.prev;
        this.top = prev;
        this.count--;
      }
    } else {
      this.warnUnInitialized();
    }
  }

  peek() {

  }

  isEmpty() {
    if(this.top) {
      console.log('The Stack is not empty');
      return false;
    } else {
      console.log('The Stack is empty');
      return true;
    }
  }

  isFull() {
    if(this.count < this.size) {
      console.log('The Stack is not full');
      return false;
    } else {
      console.log('The Stack is full');
      return true;
    }
  }

  warnUnInitialized() {
    console.log('The Stack is not initialized');
  }

  size() {
    console.log('The size of the stack is ' + this.size);
  }  

  printAll() {
    console.log('=======');
    console.log('STACK');
    let current = this.top, tempArray = [];
    while(current) {
      tempArray.push(current.data);
      current = current.prev;
    }
    let output = tempArray.reduce((acc, item) => { return acc + '[' + item + ']\n' }, []);
    console.log(output);
    console.log('=======');
  }
}

const demoStackLinkedList = () => {
  let stackk = new StackLinkedList(5);
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

export { StackLinkedList, demoStackLinkedList }