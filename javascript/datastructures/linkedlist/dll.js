'use strict'

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
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
      let previousTail = this.tail;
      this.tail = newNode;
      this.tail.prev = previousTail;
      previousTail.next = this.tail;
    }
    this.length++;
  }

  // Delete at the end
  pop() {
    if (this.isEmpty())
      return undefined;

    let prev = this.tail.prev;
    prev.next = null;
    this.tail = prev;
    this.length--;
  }

  // Insert at the beginning
  unshift(value) {
    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.initialize(newNode);
    } else {
      let previousHead = this.head;
      this.head = newNode;
      this.head.next = previousHead;
      previousHead.prev = this.head;
    }
    this.length++;
  }

  // Delete at the beginning
  shift() {
    if (this.isEmpty())
      return undefined;

    let next = this.head.next;
    next.prev = null;
    this.head = next;
    this.length--;
  }

  // Update value at position
  set(pos, value) {
    if (this.isEmpty() || pos >= this.length)
      return undefined;

    let current = this.head;
    for (let counter = 0; counter < pos; counter++) {
      current = current.next;
    }
    current.value = value;
  }

  // Get value at position
  get(pos) {
    if (pos >= this.length)
      return undefined;

    let current = this.head;
    for (let counter = 0; counter < pos; counter++) {
      current = current.next;
    }
    return current.value;
  }

  // Insert at position
  insert(pos, value) {
    if(pos >=this.length)
      return undefined;

    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.initialize(newNode);
    } else {
      let current = this.head;
      for (let counter = 0; counter < pos; counter++) {
        current = current.next;
      }
      let prev = current.prev;
      prev.next = newNode;
      newNode.prev = prev;
      current.prev = newNode;
      newNode.next = current;
    }
    this.length++;
  }

  // Remove at position
  remove(pos) {
    if(this.isEmpty() || pos >= this.length)
      return undefined;
    let current = this.head;
    for(let counter =0;counter<pos;counter++) {
      current = current.next;
    }
    let prev = current.prev;
    let next = current.next;
    prev.next = next;
    next.prev = prev;
    this.length--;
  }

  // Reverse the entire list
  reverse() {
    if(this.isEmpty())
      return undefined;
    let current = this.head;
    while(current) {
      let next = current.next;
      let prev = current.prev;
      current.prev = next;
      current.next = prev;
      current = next;
    }
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    this.print();
  }

  print() {
    if(this.isEmpty())
      return undefined;
    let current = this.head;
    let output = [];
    while(current) {
      output.push('[' + current.value + ']');
      current = current.next;
    }
    console.log(output.join(' -> '));
  }

}

const demo = () => {
  let dll = new DoublyLinkedList();
  dll.push(10);
  dll.push(20);
  dll.push(30);
  dll.push(40);
  dll.push(50);
  dll.print();
  dll.pop();
  dll.print();
  dll.unshift(5);
  dll.print();
  dll.shift();
  dll.print();
  dll.set(0, 9);
  dll.print();
  dll.set(0, 10);
  dll.print();
  console.log(dll.get(1));
  dll.insert(2, 25);
  dll.print();
  dll.remove(2);
  dll.print();
  console.log('-----------------');
  dll.reverse();
}

demo();