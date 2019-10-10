'use strict'

class Item {
  constructor(name = 'End', profits = 0, weight = 0) {
    this.name = name;
    this.profits = profits;
    this.weight = weight;
  }
}

class ZeroOneKnapsack {
  constructor(capacity) {
    this.capacity = capacity;
    this.sack = new Array();
  }

  fillSack(items) {
    let result = this.getItemsForSack(items, this.capacity);
    this.sack.push(...result);
    this.printSack();
  }

  getItemsForSack(items, capacity) {
    if(items && items.length <= 0) return new Array();
    if(capacity <= 0) return new Array();
    let result1 = new Array(), result2 = new Array(), profit1 = 0, profit2 = 0;
    if(items[0].weight <= capacity) {
      result1.push(items[0]);
      let tempResult1 = this.getItemsForSack(items.slice(1), capacity - items[0].weight);
      result1.push(...tempResult1);
    }
    let tempResult2 = this.getItemsForSack(items.slice(1), capacity);
    result2.push(...tempResult2);
    profit1 = this.getProfit(result1);
    profit2 = this.getProfit(result2);
    if(profit1 > profit2) {
      return result1;
    } else {
      return result2;
    }
  }

  printSack() {
    let sackProfit = this.getProfit(this.sack);
    let sackItems = this.sack.map((item) => item.name);
    console.log(`The items in sack are ${JSON.stringify(sackItems)} with total profit ${sackProfit}`);
  }

  getProfit(items) {
    return items.reduce((acc, item) => acc + (item ? item.profits : 0), 0);
  }
}

const demo = () => {
  let knapsack = new ZeroOneKnapsack(7);
  knapsack.fillSack(new Array(
    new Item('Mango', 31, 3),
    new Item('Apple', 26, 1),
    new Item('Banana', 72, 5),
    new Item('Orange', 17, 2)
  ));
}

demo();