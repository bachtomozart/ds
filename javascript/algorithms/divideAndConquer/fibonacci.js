'use strict'

class Fibonacci {
  constructor() {
    this.map = new Map();
  }

  fibonacci(number) {
    if (number < 1) return null;
    if (number === 1) return 0;
    if (number === 2) return 1;
    if (this.map.has(number)) return this.map.get(number);
    let result = this.fibonacci(number - 2) + this.fibonacci(number - 1);
    this.map.set(number, result);
    return result;
  }
}

const demo = () => {
  let fib = new Fibonacci();
  console.log(fib.fibonacci(10));
  console.log(fib.fibonacci(20));
}

demo();