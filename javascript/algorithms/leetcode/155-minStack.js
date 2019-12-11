class MinStack {
    
  constructor() {
      this.last = -1;
      this.store = [];
  }
  
  push(number) {
      this.store.push(number);
      this.last+=1;
  }
  
  pop() {
      this.last-=1;
      return this.store.pop();
  }
  
  top() {
      return this.store[this.last];
  }
  
  getMin() {
      let min = 0;
      for(let i = 0; i < this.store.length; i++) {
          min = Math.min(min, this.store[i]);
      }
      return min;
  }
}

