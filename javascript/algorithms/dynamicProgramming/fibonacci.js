'use strict'

class Fibonacci {
  constructor() {
    this.array = [0, 1]
    this.computed = new Set([0, 1]);
  }

  getFibonacci(n) {
    let result = this.findFibonacci(n);
    console.log(`The fibonacci for ${n} is ${result}`);
  }

  findFibonacci(n) {
    if(this.computed.has(n)) return this.array[n];
    for(let i = this.array.length-1; i < n; i++) {
      this.array.push(this.array[i-1] + this.array[i-2]);
    }
    return this.array[n];
  }
}

const demo = () => {
  let fib = new Fibonacci();
  fib.getFibonacci(5);
}

demo();