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
    let result = recursive;
    console.log(`The MCP is ${result}`);
    this.printCounts();
  }

  findMCPRecursive(input, maxCost, cost=0, paths=0, i=(input.length-1), j=(input.length-1)) {
    this.recursiveCount++;
    if(i < 0 || j < 0) return 0;
    let left = this.findMCPRecursive(input, maxCost, cost + input[i][j], paths, i, j-1);
    let up = this.findMCPRecursive(input, maxCost, cost + input[i][j], paths, i-1, j);
    paths = up + left;
    if(i===0 && j===0 && (cost + input[0][0]) === maxCost) {
      paths = paths + 1;
    }
    return paths;
  }

  findMCPTopDown(input, maxCost, cost=0, paths=0, i=(input.length-1), j=(input.length-1)) {
    this.topDownCount++;
    if(i < 0 || j < 0) return 0;
    if(this.tdArray[i][j]) return this.tdArray[i][j];
    let left = this.findMCPTopDown(input, maxCost, cost + input[i][j], paths, i, j-1);
    let up = this.findMCPTopDown(input, maxCost, cost + input[i][j], paths, i-1, j);
    paths = up + left;
    if(i===0 && j===0 && (cost + input[0][0]) === maxCost) {
      paths = paths + 1;
    }
    this.tdArray[i][j] = paths;
    return paths;
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