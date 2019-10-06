'use strict'

const DisjointNode = require('./disjointNode');

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
      item2 = set2.belongsTo;
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

  amalgamate(absorber, toBeAbsorbed) {
    let toBeAbsorbedSet = this.map.get(toBeAbsorbed).set;
    for(let tobeAbsorbedItem of toBeAbsorbedSet) {
      this.map.get(tobeAbsorbedItem).nowBelongsTo(absorber);
      this.map.get(tobeAbsorbedItem).removeFromSet(tobeAbsorbedItem);
      this.map.get(absorber).addToSet(tobeAbsorbedItem);
    }
  }

  printSet() {
    console.log(`DisjointSet -> ${JSON.stringify([...this.map])}`);
  }
}
const demo = () => {
  let set = new DisjointSet(10);
  set.makeSet(['A', 'B', 'C', 'D', 'E']);
  set.union('A', 'B');
  set.union('C', 'D');
  set.union('A', 'D');
  set.findSet('E');
  set.findSet('C');
};

demo();

module.exports = DisjointSet;