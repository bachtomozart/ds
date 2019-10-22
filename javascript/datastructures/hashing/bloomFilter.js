'use strict'

const Hash = require('./hash');

class BloomFilter {
  constructor(size = 4294967295, isDemo = false) {
    this.array = new Array(size).fill(false);
    this.size = size;
    this.hashSize = 4;
    this.hasher = new Hash(this.hashSize);
    this.isDemo = isDemo;
  } 

  add(data, i = 0) {
    for(let i = 0; i < this.hashSize; i++) {
      const hash = this.generateHash(data, i);
      this.array[hash] = true;
    }
    console.log(`${data} has been added`);
  }

  has(data, i = 0) {
    let status = true;
    for(let i = 0;i<this.hashSize; i++) {
      const hash = this.generateHash(data, i);
      if(!this.array[hash]) {
        status = false;
        break;
      }
    }
    if(status) {
      console.log(`${data} maybe present`);
    } else {
      console.log(`${data} is not present`);
    }
  }

  generateHash(data, i=0) {
    let hash = this.hasher.hash(data, i);
    if(this.isDemo) hash = hash % this.size;
    return hash;
  }

  printAll() {
    for(let i=0;i<this.size;i++) {
      console.log(`[${i} - ${this.array[i]}]`);
    }
  }

}

const demo = () => {
  let filter = new BloomFilter(10, true);
  filter.add('Mozart');
  filter.add('Beethoven');
  filter.add('Tchaikovsky');
  filter.add('Hello');
  filter.add('World');
  filter.add('World');
  filter.has('Mozart');
  filter.has('Beethoven');
  filter.has('World');
  filter.has('Hello');
  filter.printAll();
};

demo();