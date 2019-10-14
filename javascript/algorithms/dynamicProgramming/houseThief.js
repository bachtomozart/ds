'use strict'

class House {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class HouseThief {
  constructor() {
    this.map = new Map();
    this.recursiveCount = 0;
    this.topDownCount = 0;
    this.bottomUpCount = 0;
  }

  getTargets(houses) {
    let recursive = this.findTargetsRecursive(houses)
    let topDown = this.findTargetsTopDown(houses)
    let result = topDown;
    console.log(`The max possible value is ${result}`);
    console.log(`Recursive : ${this.recursiveCount}, TopDown : ${this.topDownCount}`);
  }

  findTargetsRecursive(houses, pos = 0) {
    this.recursiveCount++;
    if (pos >= houses.length) return 0;
    let steal = houses[pos].value + this.findTargetsRecursive(houses, pos + 2); 
    let skip = this.findTargetsRecursive(houses, pos + 1);
    return Math.max(steal, skip);
  }

  findTargetsTopDown(houses, pos = 0) {
    this.topDownCount++;
    if (pos >= houses.length) return 0;
    if (this.map.has(pos)) return this.map.get(pos);
    let steal = houses[pos].value + this.findTargetsTopDown(houses, pos + 2); 
    let skip = this.findTargetsTopDown(houses, pos + 1);
    let result = Math.max(steal, skip)
    this.map.set(pos, result);
    return result;
  }
}

const demo = () => {
  let ht = new HouseThief();
  ht.getTargets(new Array(
    new House('h1', 6),
    new House('h2', 7),
    new House('h3', 1),
    new House('h4', 30),
    new House('h5', 8),
    new House('h6', 2), 
    new House('h7', 4))
  );
}

demo();