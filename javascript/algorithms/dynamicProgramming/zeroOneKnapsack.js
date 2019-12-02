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

    let dp = Array.from({
      length: capacity + 1
    }, () => Array(items.length).fill(0));
    let topDown = this.fillSackTopDown(capacity, items, dp);

    dp = Array.from({
      length: capacity + 1
    }, () => Array(items.length+1).fill(0));
    let bottomUp = this.fillSackBottomUp(capacity, items, dp);

    let result = bottomUp;
    console.log(`The max fill for knapsack is ${result}`);
    this.printCounts();
  }

  fillSackRecursive(capacity, items, pos = 0) {
    this.recursiveCount++;
    if (pos >= items.length) {
      return 0;
    }
    let steal = 0;
    if (items[pos].weight < capacity)
      steal = items[pos].profit + this.fillSackRecursive((capacity - items[pos].weight), items, pos + 1);
    let skip = this.fillSackRecursive(capacity, items, pos + 1);
    return Math.max(steal, skip)
  }

  fillSackTopDown(capacity, items, dp, pos = items.length - 1) {
    if (pos < 0) return 0;
    if (dp[capacity][pos]) return dp[capacity][pos];
    this.topDownCount++;
    let steal = 0;
    if (items[pos].weight < capacity)
      steal = items[pos].profit + this.fillSackTopDown((capacity - items[pos].weight), items, dp, pos - 1);
    let skip = this.fillSackTopDown(capacity, items, dp, pos - 1);
    dp[capacity][pos] = Math.max(steal, skip);
    return dp[capacity][pos];
  }

  fillSackBottomUp(capacity, items, dp) {
    for (let i = 1; i <= items.length; i++) {
      for (let j = 1; j <= capacity; j++) {
        this.bottomUpCount++;
        let steal = 0;
        if(items[i-1].weight < j) {
          steal = dp[j - items[i-1].weight][i-1] + items[i-1].profit;
        }
        let skip = dp[j][i-1];
        dp[j][i] = Math.max(steal, skip);
      }
    }
    return dp[capacity][items.length-1];
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