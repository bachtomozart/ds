'use strict';

import { questionInt } from 'readline-sync';

class Node {
  constructor (data, next=null, prev=null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class linkedList {
  constructor () {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  insertFirst(data) {
    let node = new Node(data);
    if(!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const temp = this.head;
      this.head = node;
      node.next = temp;
    }
    this.size++;
  }

  insertLast(data) {
    let node = new Node(data);
    let current = this.head, prev = null;
    if(!this.tail) {
      while(current) {
        prev = current;
        current = current.next;
      }
      prev.next = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  insertAfter(location, data) {
    let node = new Node(data);
    if (location < this.size) {
      let current = this.head, prev = null, i = 0;
      while(i < location) {
        prev = current;
        current = current.next;
        i++;
      }
      prev.next = node;
      node.next = current;
      this.size++;
    } else {
      this.insertLast(data);
    }
  }

  deleteFirst() {
    if(this.size) {
      let temp = this.head;
      let next = this.head.next;
      this.head = next;
      this.size--;
    }
  }

  deleteLast() {
    if (this.size) {
      this.deleteAt(this.size);
    }
  }

  deleteAt(location) {
    let current = this.head, prev = null, next = null, i = 0;
    while(i < location-1) {
      prev = current;
      current = current.next;
      i++
    }
    next = current.next;
    prev.next = next;
    current = null;
    this.size--;
  }

  printAll() {
    let current = this.head, data = [];
    while(current) {
      data.push('[' + current.data + ']');
      current = current.next;
    }
    let output = data.join(' -> ');
    console.log('LinkedList[' + this.size + '] - ' + output);
  }
}

let status = true, ll = new linkedList();

ll.insertFirst(500);
ll.insertFirst(400);
ll.insertFirst(200);
ll.insertFirst(100);
ll.printAll();
ll.insertLast(900);
ll.printAll();
ll.insertAfter(2, 300);
ll.insertAfter(5, 600);
ll.insertAfter(6, 700);
ll.insertAfter(10, 800);
ll.printAll();
ll.deleteAt(3);
ll.printAll();
ll.deleteFirst();
ll.printAll();
ll.deleteLast();
ll.printAll();
ll.insertFirst(100);
ll.insertAfter(2, 300);
ll.insertAfter(7, 800);
ll.printAll();


