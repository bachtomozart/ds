'use strict'

class DisjointNode {
  constructor(belongsTo) {
    this.belongsTo = belongsTo;
    this.set = new Set([belongsTo]);
  }

  addToSet(newItem) {
    this.set.add(newItem);
  }

  removeFromSet(item) {
    this.set.delete(item);
  }

  clearSet() {
    this.set = new Set();
  }

  nowBelongsTo(newSet) {
    this.belongsTo = newSet;
  }
}

module.exports = DisjointNode;