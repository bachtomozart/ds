'use strict'

class House {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class HouseThief {
  constructor() {

  }

  findTargets(houses) {
    if (houses && houses.length <= 0) return 0;
    let result1 = houses[0].value + this.findTargets(houses.slice(2));
    let result2 = this.findTargets(houses.slice(1));
    return Math.max(result1, result2);
  }
}

const demo = () => {
  let ht = new HouseThief();
  let result = ht.findTargets(new Array(
    new House('h1', 6),
    new House('h2', 7),
    new House('h3', 1),
    new House('h4', 30),
    new House('h5', 8),
    new House('h6', 2), 
    new House('h7', 4))
  );

  console.log(`Max theft value is ${result}`);
}

demo();