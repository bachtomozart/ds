'use strict'

class MinCostPaths {
  constructor(array) {
    this.array = array;
  }

  getMCP(cost) {
    let result = this.findMCP(0,0,cost,0);
    console.log(`The total paths for the given ${cost} is ${result}`);
  }

  findMCP(x, y, totalCost, currCost) {
    if(x >= this.array.length - 1 || y >= this.array.length - 1) return currCost;
    let right = this.findMCP(x, y+1, totalCost, currCost + this.array[x][y]);
    let down = this.findMCP(x+1, y, totalCost, currCost + this.array[x][y]);
    let result = 0;
    if(x === this.array.length-1 && y === this.array.length - 1) {
      if(currCost + this.array[x][y] === totalCost) 
        return 1 + Math.max(right,down);
    }
    return right + down;
  }
}

const demo = () => {
  let mcp = new MinCostPaths([
    [4,7,1,6],
    [5,7,3,9],
    [3,2,1,2],
    [7,1,6,3],
  ]);
  mcp.getMCP(25);
}

demo();