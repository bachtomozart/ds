'use strict'

class MinCostPaths {
  constructor(array) {
    this.array = array;
  }

  getMCP(cost) {
    let result = this.findMCP(cost);
    console.log(`The total paths for the given ${cost} is ${result}`);
  }

  findMCP(totalCost, paths = 0, cost = 0, x = this.array.length - 1, y = this.array.length - 1) {
    if(x < 0 || y < 0) return 0;
    let up = this.findMCP(totalCost, paths, cost + this.array[x][y], x, y-1);
    let down = this.findMCP(totalCost, paths, cost + this.array[x][y], x -1, y);
    paths = up + down;
    if(x===0 && 
      y===0 && 
      (cost + this.array[0][0]) === totalCost) {
      paths = paths + 1;
    }
    return paths;
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