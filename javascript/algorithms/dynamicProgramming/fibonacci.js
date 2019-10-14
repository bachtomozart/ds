'use strict'

class Fibonacci {

  constructor() {
    this.array = [0, 1]
    this.computed = new Set([0, 1]);
    this.map = new Map([[1, 0], [2, 1]]);
  }

  getFibonacci(n) {
    let result = this.findFibonacci(n);
    console.log(`The fibonacci for ${n} is ${result}`);
  }

  // recursive
  fib(number) {
    return this.fib(number-1) + this.fib(number-2);
  }

  // Top Down (Memoization)
  fibonacci(number) {
    if (number < 1) 
      return null;
    if (this.map.has(number)) 
      return this.map.get(number);
    let result = this.fibonacci(number - 1) + this.fibonacci(number - 2);
    this.map.set(number, result);
    return result;
  }

  // Bottom up (Tabulation)
  findFibonacci(n) {
    if(this.computed.has(n)) return this.array[n];
    for(let i = this.array.length; i < n; i++) {
      this.array.push(this.array[i-1] + this.array[i-2]);
    }
    return this.array[n-1];
  }
}

const demo = () => {
  let fib = new Fibonacci();
  fib.getFibonacci(10);
  fib.getFibonacci(20);
}

demo();