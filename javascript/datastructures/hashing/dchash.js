'use strict'

const hashLibrary = require('./hash');

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor(data) {
    this.head = new Node(data);
    this.tail = this.head;
    this.size = 1;
  }

  add(data) {
    let oldTailNode = this.tail;
    this.tail = new Node(data);
    oldTailNode.next = this.tail;
    this.tail.prev = oldTailNode;
    this.size++;
  }

  delete(data) {
    let currNode = this.head;
    let status = false;
    while(currNode.next) {
      if(currNode.data === data) {
        let prevNode = currNode.prev;
        let nextNode = currNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        status = true;
        this.size--;
        return status;
      }
      currNode = currNode.next;
    }
    return status;
  }

  has(data) {
    let currNode = this.head;
    if(this.size === 1) return currNode.data === data;
    while(currNode.next) {
      if(currNode.data === data) {
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }
}

class DirectChainHash {

  constructor(size) {
    this.array = new Array(Number(size));
    this.hashModule = new hashLibrary();
  }

  add(data) {
    const hash = this.hashModule.murmurHash(data);
    if(!this.array[hash]) {
      this.array[hash] = new LinkedList(data);
    } else {
      this.array[hash].add(data);
    }
  }

  delete(data) {
    const hash = this.hashModule.murmurHash(data);
    if(!this.array[hash]) {
      console.log(`${data} not found`);
    } else {
      let deleteStatus = this.array[hash].delete(data);
      if(deleteStatus) {
        console.log(`${data} has been deleted`);
      } else {
        console.log(`${data} could not be deleted`);
      }
    }
  }

  has(data) {
    const hash = this.hashModule.murmurHash(data);
    if(!this.array[hash]) {
      console.log(`${data} was not found`);
    } else {
      let searchStatus = this.array[hash].has(data);
      if(searchStatus) {
        console.log(`${data} was found`);
      } else {
        console.log(`${data} was not found`);
      }
    }
  }
}

const demoDCHash = () => {
  let dcHash = new DirectChainHash(4294967295);
  dcHash.add("Govindarajan");
  dcHash.add("Panneerselvam");
  dcHash.add("Valarmathi");
  dcHash.add("Janaki");
  dcHash.add("Swetha");
  dcHash.add("Abhinav");
  dcHash.has("Govindarajan");
};

demoDCHash();