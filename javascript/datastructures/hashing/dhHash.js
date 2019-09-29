'use strict'

const Hash = require('./hash');

class DoubleHashingHash {

  constructor(size = 4294967295, isDemo = false) {
    this.array = new Array(Number(size));
    this.hasher = new Hash();
    this.size = size;
    this.isDemo = isDemo;
  }

  add(data) {
    const hash = this.generatehash(data);

  }

  delete(data) {
    const hash = this.generatehash(data);

  }

  has(data) {
    const hash = this.generatehash(data);

  }

  generateHash(data) {
    let hash = this.hasher.murmurHash(data) % 10;
    if(this.isDemo) hash = hash % this.size;
    return hash;
  }

}

(() => {
  let hash = new DoubleHashingHash();
  hash.add("Govindarajan");
  hash.add("Panneerselvam");
  hash.add("Valarmathi");
  hash.add("Janaki");
  hash.add("Swetha");
  hash.add("Abhinav");
  hash.has("Govindarajan")
})();