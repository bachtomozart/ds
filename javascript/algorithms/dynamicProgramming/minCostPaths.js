'use strict'

const Dynamic = require('./dynamic');

class MCP extends Dynamic {

  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.map = new Map();
    this.tdArray = new Object();
  }

  getMCP(input, maxCost) {
    let recursive = this.findMCPRecursive(input, maxCost);
    this.initializeTDArray(input);
    let topDown = this.findMCPTopDown(input, maxCost);
    let bottomUp = this.findMCPBottomUp(input, maxCost);
    let result = bottomUp;
    console.log(`The MCP for given cost ${maxCost} is ${result}`);
    this.printCounts();
  }

  findMCPRecursive(input, cost, i=(input.length-1), j=(input.length-1)) {
    this.recursiveCount++;
    if(cost < 0) 
      return 0;
    if(i === 0 && j === 0) 
      return ((input[0][0] - cost) === 0) ? 1 : 0;
    if(i === 0) 
      return this.findMCPRecursive(input, cost - input[i][j], i, j-1);
    if(j === 0) 
      return this.findMCPRecursive(input, cost - input[i][j], i-1, j);
    let left = this.findMCPRecursive(input, cost - input[i][j], i, j-1);
    let up = this.findMCPRecursive(input, cost - input[i][j], i-1, j);
    return left + up;
  }

  findMCPTopDown(input, cost, i=(input.length-1), j=(input.length-1)) {
    this.topDownCount++;
    if(cost < 0) 
      return 0;
    if(i === 0 && j === 0) 
      return ((input[0][0] - cost) === 0) ? 1 : 0;
    // if(this.tdArray[i][j]) 
      // return this.tdArray[i][j];
    if(this.map.has(this.getKey(i,j,cost))) return this.map.get(this.getKey(i,j,cost));
    if(i === 0) 
      return this.findMCPTopDown(input, cost - input[i][j], 0, j-1);
    if(j === 0) 
      return this.findMCPTopDown(input, cost - input[i][j], i-1, 0);
    let left = this.findMCPTopDown(input, cost - input[i][j], i, j-1);
    let up = this.findMCPTopDown(input, cost - input[i][j], i-1, j);
    let result = left + up;
    // this.tdArray[i][j] = result;
    this.map.set(this.getKey(i,j,cost),result);
    return result;
  }

  getKey(i,j,cost) {
    return i + '-' + j + '-' + cost;
  }

  initializeTDArray(input) {
    this.tdArray = new Object();
    for(let i=0;i<=input.length;i++) {
      this.tdArray[i] = new Object();
      for(let j=0;j<=input.length;j++) {
        this.tdArray[i][j] = null;
      }
    }
  }

  findMCPBottomUp(input, maxCost) {
    this.initializeArray(input, maxCost);
    for(let i=(input.length-1);i>=0;i--) {
      for(let j=(input.length-1);j>=0;j--) {
        this.bottomUpCount++;
        let cell = this.array[i][j];
        cell.calculateForRightCell(this.array[i][j+1]);
        cell.calculateForDownCell(this.array[i+1][j]);
        console.log(JSON.stringify(this.array[i][j]));
      }
    }
    return this.array[0][0].calculatePathways();
  }

  initializeArray(input, maxCost) {
    this.array = new Object();
    for(let i=0;i<=input.length;i++) {
      this.array[i] = new Object();
      for(let j=0;j<=input.length;j++) {
        if(i === input.length-1 && j === input.length -1) {
          this.array[i][j] = new MCPNode(input[i][j], Array(1).fill(maxCost), new Array());
        } else {
          this.array[i][j] = new MCPNode((input[i] && input[i][j] ? input[i][j] : 0));
        }
      }
    }
    this.printArray(input);
  }

  printArray(input) {
    console.log('-----------------------');
    for(let i=0;i<=input.length;i++) {
      let string = '';
      for(let j=0;j<=input.length;j++) {
        let value = this.array[i] 
        && this.array[i][j] 
        && this.array[i][j].cost !== null 
        ? this.array[i][j].cost 
        : 'N';
        string += '[' + value + ']\t';
      }
      console.log(string);
    }
    console.log('-----------------------');
  }

}

class MCPNode {

  constructor(cost, down = new Array(), right = new Array()) {
    this.cost = cost;
    this.down = down;
    this.right = right;
  }

  calculateForDownCell(cell) {
    for(let downCost of cell.down) {
      this.down.push(downCost-cell.cost);
    }
    for(let rightCost of cell.right) {
      this.down.push(rightCost-cell.cost);
    }
  }

  calculateForRightCell(cell) {
    for(let downCost of cell.down) {
      this.right.push(downCost-cell.cost);
    }
    for(let rightCost of cell.right) {
      this.right.push(rightCost-cell.cost);
    }
  }

  calculatePathways() {
    let downPaths = 0, rightPaths = 0;
    for(let downCost of this.down) {
      if(downCost === this.cost) downPaths++;
    }
    for(let rightCost of this.right) {
      if(rightCost === this.cost) rightPaths++;
    }
    return downPaths + rightPaths;
  }

}

const demo = () => {
  let mcp = new MCP();
  mcp.getMCP([
    [4,7,1,6],
    [5,7,3,9],
    [3,2,1,2],
    [7,1,6,3],
  ], 25);
}

demo();