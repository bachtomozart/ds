'use strict'

class MinCostArray {
  constructor(array) {
    this.array = array;
  }

  getMinCost() {
    let result = this.findMinCost();
    console.log(`The min cost to reach end of array is ${result}`);
  }

  findMinCost(x=0 ,y=0) {
    if(x >= this.array.length || y >= this.array.length) return Infinity;
    let right = this.findMinCost(x+1,y);
    let down = this.findMinCost(x, y+1);
    if(right === Infinity && down === Infinity) {
      return this.array[x][y];
    }
    return Math.min(right, down) + this.array[x][y];
  }
}

const demo = () => {
  let mca = new MinCostArray([
    [4,7,8,6,4],
    [6,7,3,9,2],
    [3,8,1,2,4],
    [7,1,7,3,7],
    [2,9,8,9,3]
  ]);

  mca.getMinCost();
}

demo();