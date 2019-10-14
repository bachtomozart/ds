'use strict'

class Fibonacci {

  constructor() {
    this.array = [0, 1]
    this.computed = new Set([0, 1]);
    this.map = new Map([[1, 0], [2, 1]]);
    this.recursiveCount = 0;
    this.topDownCount = 0;
    this.bottomUpCount = 0;
  }

  getFibonacci(n) {
    let recursive = this.fibonacciRecursive(n);
    let topDown = this.fibonacciTopDown(n);
    let bottomUp = this.fibonacciBottomUp(n);
    let result = bottomUp;
    console.log(`The fibonacci for ${n} is ${result}`);
    console.log(`Recursive - ${this.recursiveCount}, TopDown - ${this.topDownCount}, BottomUp - ${this.bottomUpCount}`);
  }

  // recursive
  fibonacciRecursive(number) {
    if(number === 0) return 0;
    if(number === 1) return 1;
    this.recursiveCount++;
    return this.fibonacciRecursive(number-1) + this.fibonacciRecursive(number-2);
  }

  // Top Down (Memoization)
  fibonacciTopDown(number) {
    this.topDownCount++;
    if (number < 1) 
      return null;
    if (this.map.has(number)) 
      return this.map.get(number);
    let result = this.fibonacciTopDown(number - 1) + this.fibonacciTopDown(number - 2);
    this.map.set(number, result);
    return result;
  }

  // Bottom up (Tabulation)
  fibonacciBottomUp(n) {
    if(this.computed.has(n)) return this.array[n];
    for(let i = this.array.length; i < n; i++) {
      this.bottomUpCount++;
      this.array.push(this.array[i-1] + this.array[i-2]);
    }
    return this.array[n-1];
  }
}

const demo = () => {
  let fib = new Fibonacci();
  fib.getFibonacci(20);
}

demo();