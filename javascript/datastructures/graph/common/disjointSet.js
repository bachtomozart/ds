'use strict'

const DisjointNode = require('./disjointNode');

class OldDisjointSet {
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

class DisjointSet {
  constructor() {
    this.map = new Map();
  }

  makeSet(items) {
    for(let item of items) {
      this.map.set(item, new DisjointNode(item));
    }
    console.log(`Disjoint set has been made for ${JSON.stringify(items)}`);
    // this.printSet();
  }

  union(item1, item2) {
    let set1 = this.map.get(item1),
      set2 = this.map.get(item2),
      size1 = set1.set.size,
      size2 = set2.set.size;
    
    if (size1 === 0) {
      set1 = this.map.get(set1.belongsTo);
      size1 = set1.set.size;
    } else if (size2 === 0) {
      set2 = this.map.get(set2.belongsTo);
      size2 = set2.set.size;
    } 
    if(size1 >= size2) {
      this.amalgamate(item1, item2);
    } else {
      this.amalgamate(item2, item1);
    }
    console.log(`Union of ${item1} and ${item2} is now complete`);
    // this.printSet();
  };

  findSet(item) {
    let result = this.map.get(item).belongsTo;
    console.log(`${item} belongs to ${result}`);
    return result;
  }

  getSet(item) {
    let result = this.map.get(item).set;
    console.log(`${item} has ${JSON.stringify([...result])}`);
    return result;
  }

  amalgamate(amalgamator, amalgamatee) {
      this.map.get(amalgamatee).nowBelongsTo(amalgamator);
      this.map.get(amalgamatee).removeFromSet(amalgamatee);
      this.map.get(amalgamator).addToSet(amalgamatee);
  }

  printSet() {
    console.log(`DisjointSet -> ${JSON.stringify([...this.map])}`);
  }
}

const demo = () => {
  // let set = new DisjointSet(10);
  let set = new DisjointSet();
  set.makeSet(['A', 'B', 'C', 'D', 'E']);
  set.union('A', 'B');
  set.union('A', 'E');
  let eSet = set.findSet('E');
  set.getSet(eSet);
  set.printSet();
};

demo();

module.exports = DisjointSet;