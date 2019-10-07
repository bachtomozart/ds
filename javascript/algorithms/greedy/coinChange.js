'use strict'

class Denomination {
  constructor(country = 'India') {
    this.store = new Array();
    this.initialize(country);
    this.country = country;
  }

  initialize(country) {
    switch(country) {
      case 'Usa':
        this.store = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 50, 100];
        break;
      case 'India':
      default:
        this.store = [0.25, 0.50, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
    }
    this.store.sort((a,b) => b - a);
  }

  getCount(amount, denomination) {
    return (amount - (amount % denomination)) / denomination;
  }

  deductFromAmount(amount, denomination, count) {
    return amount - (denomination * count);
  }
}

class CoinChange {
  constructor(country) {
    this.denominations = new Denomination(country);
    this.change = new Map();
  }

  get(amount) {
    let amountToCheck = amount;
    for(let denomination of this.denominations.store) {
      const notes = this.denominations.getCount(amountToCheck, denomination);
      this.change.set(denomination, notes);
      amountToCheck = this.denominations.deductFromAmount(amountToCheck, denomination, notes);
    }
    this.print(amount);
    return this.change;
  }

  print(amount) {
    console.log(`Coin Change - ${this.denominations.country}\nAmount - ${amount}\nNotes - ` + JSON.stringify([...this.change]))
  }
}

const demo = () => {
  let cc = new CoinChange();
  cc.get(1989);
  let usCC = new CoinChange('Usa');
  usCC.get(1989);
}

demo();