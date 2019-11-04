'use strict'

class Item {
  constructor(item, weight, value) {
    this.item = item;
    this.weight = weight;
    this.value = value;
    this.density = () => (this.value / this.weight) || 0;
  }

  toString() {
    return '[' + this.item + '|' + this.weight + ':' + this.value + ':' + this.density().toFixed(2) + ']';
  }
}

class FractionalKnapsack {
  constructor(capacity) {
    this.capacity = capacity;
  }

  steal(items) {
    let stolen = [];
    console.log(`Before Sort -> ${items}`);
    items = items.sort((a,b) => b.density() - a.density());
    console.log(`After Sort -> ${items}`);
    for(let item of items) {
      if(this.capacity > 0) {
        if(item.weight < this.capacity) {
          this.capacity -= item.weight;
          stolen.push(new Item(item.item, item.weight, item.value));
          item.weight = 0;
          item.value = 0;
        } else {
          let previousDensity = item.density();
          item.weight -= this.capacity;
          let newValue = this.capacity * previousDensity;
          item.value -= newValue;
          stolen.push(new Item(item.item, this.capacity, newValue));
          this.capacity = 0;
          break;
        }
      }
    }
    console.log(`After Stealing -> ${items}`);
    console.log(`Stolen -> ${stolen}`);
  }
}

const demo = () => {
  let sack = new FractionalKnapsack(10);
  sack.steal([
    new Item('item1', 6, 6),
    new Item('item2', 10, 2),
    new Item('item3', 3, 1),
    new Item('item4', 5, 8),
    new Item('item5', 1, 3),
    new Item('item6', 3, 5)
  ]);
}

demo();