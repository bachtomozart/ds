'use strict'

const Hash = require('./hash');
const max = 4294967295;

class QPHashNode {
  constructor(data, wasQuadraticProbed = false) {
    this.data = data;
    this.wasQuadraticProbed = wasQuadraticProbed;
  }
}

class QuadraticProbingHash {

  constructor(size = max, isDemo = false) {
    let newSize = size === max ? max : Math.pow(size, 3);
    this.array = new Array(newSize);
    this.hasher = new Hash();
    this.size = newSize;
    this.isDemo = isDemo;
  }

  recursiveAdd(data, incrementPos = 0) {
    const hash = this.generateHash(data);
    const pos = hash + incrementPos;
    if(!this.array[pos]) {
      this.array[pos] = new QPHashNode(data, incrementPos > 0);
    } else {
      this.recursiveAdd(data, incrementPos++);
    }
  }

  add(data) {
    const hash = this.generateHash(data);
    if(!this.array[hash]) {
      this.array[hash] = new QPHashNode(data);
      console.log(`${data} has been added`);
    } else {
      let j = 0, i = this.getNextPos(hash, j);
      while(i<this.size) {
        if(!this.array[i]) {
          this.array[i] = new QPHashNode(data, true);
          console.log(`${data} has been added with probing`);
          break;
        }
        j++;
        i = this.getNextPos(i, j);
      }
    }
  }

  delete(data) {
    const hash = this.generateHash(data);
    if(!this.array[hash] || this.array[hash].data !== data) {
      let j = 1, i = this.getNextPos(hash, j);
      while(i<this.size) {
        if(!this.array[i] || !this.array[i].wasQuadraticProbed) {
          console.log(`${data} was not found`);
          break;
        } else if(this.array[i].data === data) {
          this.array[i] = null;
          console.log(`${data} has been deleted`);
          break;
        }
        j++;
        i = this.getNextPos(i, j);
      }
    } else {
      this.array[hash] = null;
      console.log(`${data} has been deleted`);
    }
  }

  has(data) {
    const hash = this.generateHash(data);
    if(!this.array[hash] || this.array[hash].data !== data) {
      let j = 1, i = this.getNextPos(hash, j);
      while(i<this.size) {
        if(!this.array[i] || !this.array[i].wasQuadraticProbed) {
          console.log(`${data} was not found`);
          break;
        } else if(this.array[i].data === data) {
          console.log(`${data} was found`);
          break;
        }
        j++;
        i = this.getNextPos(i, j);
      }
    } else {
      console.log(`${data} was found`);
    }
  }

  printAll() {
    let result = '';
    for(let i=0;i<this.size;i++) {
      result += '\n'+ i + ' [data: ' + (this.array[i] ? this.array[i].data : null) + ' - QP:' +  (this.array[i] ? this.array[i].wasQuadraticProbed : null) + ']';
    }
    console.log(result);
  }

  generateHash(data) {
    let hash = this.hasher.murmurHash(data) % 10;
    if(this.isDemo) hash = hash % this.size;
    return hash;
  }

  getNextPos(i, j) {
    return i + Math.pow(j, 2);
  }

}

(() => {
  let hash = new QuadraticProbingHash(10);
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
  hash.printAll();
})();