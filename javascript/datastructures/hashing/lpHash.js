'use strict'

const Hash = require('./hash');

class LPHashNode {
  constructor(data, wasLinearProbed = false) {
    this.data = data;
    this.wasLinearProbed = wasLinearProbed;
  }
}

class LinearProbingHash {

  constructor(size = 4294967295, isDemo = false) {
    this.array = new Array(Number(size));
    this.hasher = new Hash();
    this.size = size;
    this.isDemo = isDemo;
  }

  recursiveAdd(data, incrementPos = 0) {
    const hash = this.generateHash(data);
    const pos = hash + incrementPos;
    if(!this.array[pos]) {
      this.array[pos] = new LPHashNode(data, incrementPos > 0);
    } else {
      this.recursiveAdd(data, incrementPos++);
    }
  }

  add(data) {
    const hash = this.generateHash(data);
    if(!this.array[hash]) {
      this.array[hash] = new LPHashNode(data);
      console.log(`${data} has been added`);
    } else {
      let i = this.getNextPos(hash);
      while(i<this.size) {
        if(!this.array[i]) {
          this.array[i] = new LPHashNode(data, true);
          console.log(`${data} has been added with probing`);
          break;
        }
        i = this.getNextPos(i);
      }
    }
  }

  delete(data) {
    const hash = this.generateHash(data);
    if(!this.array[hash] || this.array[hash].data !== data) {
      let i = this.getNextPos(hash);
      while(i<this.size) {
        if(!this.array[i] || !this.array[i].wasLinearProbed) {
          console.log(`${data} was not found`);
          break;
        } else if(this.array[i].data === data) {
          this.array[i] = null;
          console.log(`${data} has been deleted`);
          break;
        }
        i = this.getNextPos(i);
      }
    } else {
      this.array[hash] = null;
      console.log(`${data} has been deleted`);
    }
  }

  has(data) {
    const hash = this.generateHash(data);
    if(!this.array[hash] || this.array[hash].data !== data) {
      let i = this.getNextPos(hash);
      while(i<this.size) {
        if(!this.array[i] || !this.array[i].wasLinearProbed) {
          console.log(`${data} was not found`);
          break;
        } else if(this.array[i].data === data) {
          console.log(`${data} was found`);
          break;
        }
        i = this.getNextPos(i);
      }
    } else {
      console.log(`${data} was found`);
    }
  }

  printAll() {
    let result = '';
    for(let i=0;i<this.size;i++) {
      result += '\n'+ i + ' [data: ' + (this.array[i] ? this.array[i].data : null) + ' - LP:' +  (this.array[i] ? this.array[i].wasLinearProbed : null) + ']';
    }
    console.log(result);
  }

  generateHash(data) {
    let hash = this.hasher.murmurHash(data) % 10;
    if(this.isDemo) hash = hash % this.size;
    return hash;
  }

  getNextPos(i) {
    return i + 1;
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
  hash.add("World");
  hash.has("Govindarajan")
  hash.has("Valarmathi")
  hash.has("World")
  hash.printAll();
})();