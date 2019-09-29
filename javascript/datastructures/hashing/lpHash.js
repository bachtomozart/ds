'use strict'

const Hash = require('./hash');

class LinearProbingHash {

  constructor(size = 4294967295, isDemo = false) {
    this.array = new Array(Number(size));
    this.hasher = new Hash();
    this.size = size;
    this.isDemo = isDemo;
  }

  add(data) {
    let hash = this.hasher.murmurHash(data) % 10;
    if(this.isDemo) hash = hash % this.size;

  }

  delete(data) {
    let hash = this.hasher.murmurHash(data) % 10;
    if(this.isDemo) hash = hash % this.size;

  }

  has(data) {
    let hash = this.hasher.murmurHash(data) % 10;
    if(this.isDemo) hash = hash % this.size;

  }

}

(() => {
  let hash = new LinearProbingHash(10);
  hash.add("Govindarajan");
  hash.add("Panneerselvam");
  hash.add("Valarmathi");
  hash.add("Janaki");
  hash.add("Swetha");
  hash.add("Abhinav");
  hash.has("Govindarajan")
})();