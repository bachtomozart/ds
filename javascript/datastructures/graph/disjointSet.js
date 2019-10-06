'use strict'

class DisjointSet {
  constructor(size) {
    this.size = size;
    this.map = new Map();
  }

  makeSet(items) {
    for(let item of items) {
      let set = new Set();
      set.add(item);
      this.map.set(item, set)
    }
  }

  union(item1, item2) {
    let set1 = this.map.get(item1);
    let set2 = this.map.get(item2);
    if(set1.size >= set2.size) {
      set1.add(item2);
      this.map.delete(item2);
    } else {
      set2.add(item1);
      this.map.delete(item1);
    }
  }

  findSet(item) {
    for(let key of this.map.keys()) {
      if(this.map.get(key).has(item)) return key;
    }
  }

}

const demo = () => {
  let set = new DisjointSet(10);
  set.makeSet(['A', 'B', 'C', 'D', 'E']);
  set.union('A', 'B');
  set.union('A', 'E');
  let result = set.findSet('E');
  console.log(`Found E in -> ${result}`);
};

demo();