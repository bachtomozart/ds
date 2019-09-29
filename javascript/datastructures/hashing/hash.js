'use strict'
const fnv = require('fnv-plus');
const murmur = require("murmurhash-js");

class Hash {
  
  constructor(size = 10000) {
    this.defaultSeed = 29121989;
    this.hashArray = new Array(size);
    this.initializeHashFunctions(size);
  }

  initializeHashFunctions(size) {
    for(let i=0;i<size;i++) {
      this.hashArray[i] = (data) => murmur.murmur3(data, i);
    }
  }

  fnvHash(data) {
    fnv.seed(this.defaultSeed);
    let hashValue = fnv.hash(data).value;
    let temp = '' + hashValue;
    return Number(temp.substr(0, 9));
  }

  murmurHash(data) {
    let hashValue = murmur.murmur3(data, this.defaultSeed);
    let temp = '' + hashValue;
    return Number(temp.substr(0, 9));
  }

  hash(data, i) {
    return this.hashArray[i](data);
  }

  calculateNumberOfHashFunctions(size, elements) {
    return Math.ceil(Math.log(size/elements));
  }

}

module.exports = Hash;