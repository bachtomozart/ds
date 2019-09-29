'use strict'

const Hash = require('./hash');

class QuadraticProbingHash {

  constructor(size = 4294967295) {
    this.array = new Array(Number(size));
    this.hasher = new Hash();
  }

  add(data) {

  }

  delete(data) {

  }

  has(data) {

  }

}

(() => {
  let hash = new QuadraticProbingHash();
  hash.add("Govindarajan");
  hash.add("Panneerselvam");
  hash.add("Valarmathi");
  hash.add("Janaki");
  hash.add("Swetha");
  hash.add("Abhinav");
  hash.has("Govindarajan")
})();