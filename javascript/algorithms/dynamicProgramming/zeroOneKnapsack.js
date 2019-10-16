'use strict'

const Dynamic = require('./dynamic');

class Item {
  constructor(name = 'End', profit = 0, weight = 0) {
    this.name = name;
    this.profit = profit;
    this.weight = weight;
  }
}

class ZeroOneKnapsack extends Dynamic {

  constructor() {
    super();
  }

  getSack(capacity, items) {
    let recursive = this.fillSackRecursive(capacity, items);
    let topDown = this.fillSackTopDown(capacity, items);
    let bottomUp = this.fillSackBottomUp(capacity, items);
    let result = recursive;
    console.log(`The max fill for knapsack is ${result}`);
    this.printCounts();
  }

  fillSackRecursive(capacity, items, pos = 0) {
    this.recursiveCount++;
    if(pos >= items.length) {
      return 0;
    }
    let steal = 0;
    if(items[pos].weight < capacity)
      steal = items[pos].profit + this.fillSackRecursive((capacity-items[pos].weight), items, pos+1);
    let skip = this.fillSackRecursive(capacity, items, pos+1);
    return Math.max(steal, skip)
  }

  // There is no overlapping problem
  fillSackTopDown(capacity, items, pos = 0) {
    this.topDownCount++;
  }

  // There is no overlapping problem
  // But this can be done
  fillSackBottomUp(capacity, items, pos = 0) {
    this.bottomUpCount++;
  }

}

const demo = () => {
  let knapsack = new ZeroOneKnapsack();
  knapsack.getSack(7, new Array(
    new Item('Mango', 31, 3),
    new Item('Apple', 26, 1),
    new Item('Banana', 72, 5),
    new Item('Orange', 17, 2)
  ));
}

demo();