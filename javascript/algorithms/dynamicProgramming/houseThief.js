'use strict'

const Dynamic = require('./dynamic');

class House {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class HouseThief extends Dynamic {

  constructor() {
    super();
    this.map = new Map();
  }

  getTargets(houses) {
    let recursive = this.findTargetsRecursive(houses);
    let topDown = this.findTargetsTopDown(houses);
    let bottomUp = this.findTargetsBottomUp(houses);
    let result = bottomUp;
    console.log(`The max possible value is ${result}`);
    this.printCounts();
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

  findTargetsBottomUp(houses) {
    let result = 0, i = 0;
    while(i < houses.length) {
      this.bottomUpCount++;
      if (i+1 < houses.length) {
        if(houses[i].value > houses[i+1].value) {
          result += houses[i].value;
          i = i + 2;
        } else {
          result += houses[i+1].value;
          i = i + 3;
        }
      } else {
        result += houses[i].value;
      }
    }
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