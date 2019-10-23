'use strict'

class AveragePair {
  constructor() {

  }

  getAveragePair(items, target) {
    let result = this.averagePair(items, target);
    console.log(`${JSON.stringify(items)} has an average pair for ${target} - ${result}`);
  }

  averagePair(items, target) {
    if (!items.length) return false;
    // add whatever parameters you deem necessary - good luck!
    let i = 0,
      j = items.length - 1;
    while (i < j) {
      let avg = (items[i] + items[j]) / 2;
      if (avg === target) {
        return true;
      } else if (avg < target) {
        i++;
      } else {
        j--;
      }
    }
    return false;
  }
}

const demo = () => {
  let ap = new AveragePair();
  ap.getAveragePair([1, 2, 3], 2.5);
}

demo();