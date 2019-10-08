'use strict'

class Item {
  constructor(item, weight, value) {
    this.item = item;
    this.weight = weight;
    this.value = value;
  }
}

const getItems = () => {
  let result = new Array();
  result.push(new Item('item1', 6, 6));
  result.push(new Item('item2', 10, 2));
  result.push(new Item('item3', 3, 1));
  result.push(new Item('item4', 5, 8));
  result.push(new Item('item5', 1, 3));
  result.push(new Item('item6', 3, 5));
  return result;
}

class FractionalKnapsack {
  constructor(capacity, items) {
    this.sack = new Array();
    this.capacity = capacity;
    this.items = items;
  }

  fillItems() {
    for(let item of this.items) {
      item.density = item.value / item.weight;
    }
    this.items.sort((a,b) => b.density - a.density);
    for(let item of this.items) {
      if(this.capacity > 0 && this.capacity >= item.weight) {
        this.sack.push(item);
        this.decrementSackCapacity(item.weight);
      } else if(this.capacity > 0) {
        let newItem = JSON.parse(JSON.stringify(item));
        newItem.weight = this.capacity;
        newItem.value = newItem.weight * newItem.density;
        this.sack.push(newItem);
        this.decrementSackCapacity(newItem.weight);
        item.weight -= newItem.weight;
        item.value -= newItem.weight * newItem.density;
      }
    }
    this.printSack();
    return this.sack;
  }

  decrementSackCapacity(weight) {
    this.capacity = this.capacity - weight;
  }

  printSack() {
    const sackValue = this.sack.reduce((acc, item) => Number(acc) + Number(item.value), []);
    const sackWeight = this.sack.reduce((acc, item) => Number(acc) + Number(item.weight), []);
    console.log(`Knapsack filled -> ${JSON.stringify(this.sack.map((item) => item.item))} with value ${sackValue} and weight ${sackWeight}`);
  }

}

const demo = () => {
  let knapsack = new FractionalKnapsack(10, getItems());
  knapsack.fillItems();
}

demo();