'use strict';

import { questionInt } from 'readline-sync';
import { validateNumber } from '../utils/validation';

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
    if(this.size) {
      const temp = this.head;
      this.head = node;
      node.next = temp;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  insertLast(data) {
    let node = new Node(data);
    let current = this.head, prev = null;
    if (this.size) {    
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
    } else {
      this.insertFirst(data);
    }
  }

  insertAfter(location, data) {
    let node = new Node(data);
    if(this.size) {
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
    } else {
      this.insertFirst(data);
    }
  }

  deleteFirst() {
    if(this.size) {
      let next = this.head.next;
      this.head = next;
      this.size--;
    } else {
      console.log('DELETE FIRST - The linked list is empty');
    }
  }

  deleteLast() {
    if (this.size) {
      this.deleteAt(this.size);
    } else {
      console.log('DELETE LAST - The linked list is empty');
    }
  }

  deleteAt(location) {
    if (this.size && location <= this.size) {
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
    } else {
      console.log('DELETE AT - The linked list is empty');
    }
  }

  printAt(location) {
    if (this.size && location <= this.size) { 
        let current = this.head, i = 0;
        while(i < location-1) {
          current = current.next;
          i++;
        }
        console.log('Value at location[' + location + '] - ' + current.data);
    } else {
      console.log('PRINT AT - The location is out of range');
    }
  }

  printAll() {
    if(this.size) {
      let current = this.head, data = [];
      while(current) {
        data.push('[' + current.data + ']');
        current = current.next;
      }
      let output = data.join(' -> ');
      console.log('LinkedList[' + this.size + '] - ' + output);
    } else {
      console.log('PRINT ALL - The linked list is empty');
    }
  }

  search(value) {
    if (this.size) {
      let current = this.head, result = false, i=0;;
      while(current) {
        result = current.data === value;
        if(result) {
          current = null;
        } else {
          current = current.next;
        }
        i++;
      }
      let resultString = result ? 'is found at location - ' + i : 'cannot be found';
      console.log('The given value[' + value + '] ' + resultString);
    } else {
      console.log('SEARCH - The linked list is empty');
    }
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
ll.printAt(7);
ll.printAt(20);
ll.search(700);
ll.search(1000);
