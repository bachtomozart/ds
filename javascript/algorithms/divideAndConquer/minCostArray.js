'use strict'

class MinCostArray {
  constructor(array) {
    this.array = array;
    this.bottomUp = 0;
    this.topDown = 0;
  }

  // Maybe I got the top down vs bottom up mixed up, well we'll know soon
  getMinCost() {
    let result = this.findMinCost();
    let result2 = this.findMinCostTD();
    console.log(`The min cost to reach end of array is ${result} with ${this.bottomUp} recursions`);
    console.log(`The min cost to reach end of array is ${result2} with ${this.topDown} recursions`);
  }

  findMinCost(x=0 ,y=0) {
    this.bottomUp++;
    if(x >= this.array.length || y >= this.array.length) return Infinity;
    let right = this.findMinCost(x+1,y);
    let down = this.findMinCost(x, y+1);
    if(right === Infinity && down === Infinity) return this.array[x][y];
    return Math.min(right, down) + this.array[x][y];
  }

  findMinCostTD(x=this.array.length-1, y=this.array.length-1) {
    this.topDown++;
    if(x < 0 || y < 0) return Infinity;
    if(x === 0 && y === 0) return this.array[0][0];
    let up = this.findMinCostTD(x-1, y);
    let left = this.findMinCostTD(x, y-1);
    return Math.min(up, left) + this.array[x][y];
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