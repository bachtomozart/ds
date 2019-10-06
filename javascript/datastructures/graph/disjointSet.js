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
    console.log(`Set made for items ${JSON.stringify(items)}`);
  }

  union(item1, item2) {
    let set1 = this.map.get(item1);
    let set2 = this.map.get(item2);
    if(set1.size >= set2.size) {
      set1.add(item2);
      this.map.delete(item2);
      console.log(`${item2} is now moved to set ${item1}`);
    } else {
      set2.add(item1);
      this.map.delete(item1);
      console.log(`${item1} is now moved to set ${item2}`);
    }
  }

  findSet(item) {
    let result = null;
    for(let key of this.map.keys()) {
      if(this.map.get(key).has(item)) {
        result = key;
        break;
      }
    }
    console.log(`${item} is found in the set ${result}`);
  }

  printSet(item) {
    let set = this.map.get(item);
    console.log(``)
  }

}

const demo = () => {
  let set = new DisjointSet(10);
  set.makeSet(['A', 'B', 'C', 'D', 'E']);
  set.union('A', 'B');
  set.union('A', 'E');
  set.findSet('E');
  set.findSet('C');
};

demo();