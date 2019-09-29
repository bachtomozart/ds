'use strict'

const Hash = require('./hash');

class DoubleHashingHash {

  constructor(size = 4294967295, isDemo = false) {
    this.array = new Array(size);
    this.size = size;
    this.hashSize = size / 2;
    this.hasher = new Hash(this.hashSize);
    this.isDemo = isDemo;
  }

  add(data, i = 0) {
    let status = false;
    while(i<this.hashSize) {
      const hash = this.generateHash(data, i);
      if(!this.array[hash]) {
        this.array[hash] = data;
        console.log(`${data} has been added - i - ${i} - hash - ${hash}`);
        status = true;
        break;
      }
      i++;
    }
    if(!status) console.log(`${data} was not added`);
  }

  delete(data, i = 0) {
    let status = false;
    while(i<this.hashSize) {
      const hash = this.generateHash(data, i);
      if(this.array[hash] && this.array[hash] === data) {
        this.array[hash] = null;
        console.log(`${data} has been deleted`);
        status=true;
        break;
      }
      i++;
    }
    if(!status) console.log(`${data} was not found`);
  }

  has(data, i = 0) {
    let status = false;
    while(i<this.hashSize) {
      const hash = this.generateHash(data, i);
      if(this.array[hash] && this.array[hash] === data) {
        console.log(`${data} was found`);
        status=true;
        break;
      }
      i++;
    }
    if(!status) console.log(`${data} was not found`);
  }

  generateHash(data, i=0) {
    let hash = this.hasher.hash(data, i);
    if(this.isDemo) hash = hash % this.size;
    return hash;
  }

}

(() => {
  let hash = new DoubleHashingHash(10, true);
  hash.add("Govindarajan");
  hash.add("Panneerselvam");
  hash.add("Valarmathi");
  hash.add("Janaki");
  hash.add("Swetha");
  hash.add("Abhinav");
  hash.add("World");
  hash.has("Govindarajan")
  hash.has("Valarmathi")
  hash.has("World")
})();