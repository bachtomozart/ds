'use strict';

class BinaryHeap {
  constructor(comparator) {
    this.array = new Array();
    this.comparator = comparator;
    this.last = 1;
  }

  peek() {
    return this.array[1];
  }

  insert(data) {
    this.array[this.last] = data;
    this.last++;
    this.balanceBottomUp(this.last-1, this.array[this.last-1]);
  }

  extract() {
    const top = this.array[1];
    this.array[1] = this.array[this.last-1];
    this.array[this.last-1] = null;
    if (this.last > 1) this.last--;
    this.balanceTopDown(1, this.array[1]);
    return top;
  }

  balanceBottomUp(child) {
    if (child < 1) return false;
    let parent = this.parent(child);
    if(this.comparator(this.array[parent], this.array[child])) {
      this.swap(parent, child);
      this.balanceBottomUp(parent);
    }
    return true;
  }

  balanceTopDown(parent) {
    let left = this.left(parent),
      right = this.right(parent);
    if(this.array[left] && !this.array[right] && 
      this.comparator(this.array[parent], this.array[left])) {
      this.swap(parent, left);
      this.balanceTopDown(left);
    } else if (this.array[right] && !this.array[left] && 
      this.comparator(this.array[parent], this.array[right])) {
      this.swap(parent, right);
      this.balanceTopDown(right);
    } else if (this.array[left] && this.array[right]) {
      let goLeft = false;
      if(this.comparator(this.array[parent], this.array[left])) {
        this.swap(parent, left);
        goLeft = true;
      } 
      if (this.comparator(this.array[parent], this.array[right])) {
        this.swap(parent, right);
      }
      goLeft ? this.balanceTopDown(left) : this.balanceTopDown(right);
    }
  }

  parent(pos) {
    if(pos % 2 === 1) pos--;
    return pos / 2;
  }

  left(pos) {
    return pos * 2;
  }

  right(pos) {
    return this.left(pos) + 1;
  }

  swap(parent, child) {
    const parentData = this.array[parent],
      childData = this.array[child];
    this.array[parent] = childData;
    this.array[child] = parentData;
  }
}

class MaxHeap extends BinaryHeap {
  constructor() {
    super((a,b) => a < b)
  }
}

class MinHeap extends BinaryHeap {
  constructor() {
    super((a,b) => a > b)
  }
}

class Heap extends BinaryHeap {

  constructor(items, comparator) {
    if (!comparator) comparator = (a,b) => a > b;
    super(comparator);
    if (items && items.length) this.insertItems(items);
  }

  insertItems(items) {
    for(let item of items) {
      this.insert(item);
    }
  }

}

class PriorityQueue {
  constructor(items = null, comparator = null) {
    this.heap = new Heap(items, comparator);
  }

  push(data) {
    return this.heap.insert(data);
  }

  pop() {
    return this.heap.extract();
  }

  peek() {
    return this.heap.peek();
  }
}

const comparatorExample = () => {
  let max = (a,b) => a - b;
  let min = (a,b) => b - a;
  let compare = (a,b,c) => {
    console.log(`\na - ${a} b - ${b} c - ${c}`);
    let maxResult = max(a,b);
    let minResult = min(a,b);
    let children = new Array();
    children.push(b);
    children.push(c);
    let maxChosen = children.sort(min)[0];
    let minChosen = children.sort(max)[0];
    console.log(`max - ${maxResult > 0} - ${maxChosen}`);
    console.log(`min - ${minResult > 0} - ${minChosen}`);
  };
  compare(5,7,12);
  compare(5,7,6);
  compare(9,7,5);
  compare(9,7,12);
};

const demo = () => {
  let maxPriorityQueue = new PriorityQueue([1,2,3,4,5,6,7,8,9],(a,b) => a < b);
  console.log(`${JSON.stringify(maxPriorityQueue.heap.array)}`);
  console.log(`${maxPriorityQueue.pop()}`);
  console.log(`${maxPriorityQueue.pop()}`);
  console.log(`${maxPriorityQueue.pop()}`);
  console.log(`${maxPriorityQueue.pop()}`);
  console.log(`${maxPriorityQueue.pop()}`);
}

demo();
// comparatorExample();

