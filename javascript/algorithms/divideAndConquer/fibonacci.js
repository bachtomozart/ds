'use strict'

class Fibonacci {
  constructor() {
    this.map = new Map([[1, 0], [2, 1]]);
  }

  fibonacci(number) {
    if (number < 1) 
      return null;
    if (this.map.has(number)) 
      return this.map.get(number);
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