'use strict'

class Denomination {
  constructor(country = 'India') {
    this.country = country;
    this.store = [];
    this.initialize();
  }

  initialize() {
    switch (this.country) {
      case 'USA':
        this.store = [100, 50, 20, 10, 5, 1, 0.50, 0.25, 0.10, 0.01];
      break;
      case 'India':
      default:
        this.store = [2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25];
      break;
    }
  }
}

class Note {
  constructor(denomination, count) {
    this.denomination = denomination;
    this.count = count;
    this.amount = denomination * count;
  }

  toString() {
    return '[' + this.denomination + '|' + this.count + ':' + this.amount + ']';
  }
}

class CoinChange {
  constructor() {
    this.denominations = new Denomination();
  }

  getCount(amount, denomination) {
    return Math.floor(amount / denomination);
  }

  deductAmount(amount, denomination, count) {
    return amount - (denomination * count);
  }

  getChange(amount) {
    let notes = [];
    for (let denomination of this.denominations.store) {
      let count = this.getCount(amount, denomination);
      amount = this.deductAmount(amount, denomination, count);
      if(count > 0) notes.push(new Note(denomination, count));
      console.log(`denomination -> ${denomination}, amount - ${amount}, count - ${count}`);
      if(amount === 0) break;
    }
    console.log(`${notes}`);
  }
}

const demo = () => {
  let cc = new CoinChange();
  cc.getChange(9784);
}

demo();