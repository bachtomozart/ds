'use strict'

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  initialize(node) {
    this.head = node;
    this.tail = node;
  }

  isEmpty() {
    return this.length === 0;
  }

  // Insert at the end
  push(value) {
    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.initialize(newNode);
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // Delete at the end
  pop() {
    if (this.isEmpty())
      return undefined;
    let current = this.head;
    let previous = this.head;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    this.tail = previous;
    this.tail.next = null;
    this.length--;
  }

  // Insert at the beginning
  unshift(value) {
    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.initialize(newNode);
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  // Delete at the beginning
  shift() {
    if (this.isEmpty())
      return undefined;
    this.head = this.head.next;
    this.length--;
  }

  // Update value at position
  set(pos, value) {
    if (this.isEmpty() || pos >= this.length)
      return undefined;
    let counter = 0;
    let current = this.head;
    let previous = this.head;
    while (counter < pos) {
      previous = current;
      current = current.next;
      counter++;
    }
    current.value = value;
  }

  // Get value at position
  get(pos) {
    if (this.isEmpty() || pos >= this.length)
      return undefined;
    let counter = 0;
    let current = this.head;
    let previous = this.head;
    while (counter < pos) {
      previous = current;
      current = current.next;
      counter++;
    }
    return current.value;
  }

  // Insert at position
  insert(pos, value) {
    if (!this.isEmpty() && pos >= this.length)
      return undefined;

    let newNode = new Node(value);

    if (this.isEmpty()) {
      this.initialize(newNode);
      return;
    }

    let counter = 0;
    let current = this.head;
    let previous = this.head;
    while (counter < pos) {
      previous = current;
      current = current.next;
      counter++;
    }
    previous.next = newNode;
    newNode.next = current;
    this.length++;
  }

  // Remove at position
  remove(pos) {
    if (this.isEmpty() || pos >= this.length)
      return undefined;

    let counter = 0;
    let current = this.head;
    let previous = this.head;
    while (counter < pos) {
      previous = current;
      current = current.next;
      counter++;
    }
    previous.next = current.next;
    this.length--;
  }

  // Reverse the entire list
  reverse() {
    if(this.isEmpty())
      return undefined;

    let previous = this.head;
    let current = this.head.next;
    let next = current.next;
    for(let i=0;i<this.length;i++) {
      if(i > 0) {
        previous = current;
        current = next;
        next = current && current.next;
      }
      if(current) current.next = previous;
    }
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    this.tail.next = null;
    this.print();
  }

  print() {
    let output = [];
    let current = this.head;
    while (current) {
      output.push('[' + current.value + ']');
      current = current.next;
    }
    console.log(output.join(' -> '));
  }
}

const demo = () => {
  let sll = new SinglyLinkedList();
  sll.push(10);
  sll.push(20);
  sll.push(30);
  sll.push(40);
  sll.push(50);
  sll.print();
  sll.pop();
  sll.print();
  sll.unshift(5);
  sll.print();
  sll.shift();
  sll.print();
  sll.set(0, 9);
  sll.print();
  sll.set(0, 10);
  sll.print();
  console.log(sll.get(1));
  sll.insert(2, 25);
  sll.print();
  sll.remove(2);
  sll.print();
  console.log('-----------------');
  sll.reverse();
}

demo();