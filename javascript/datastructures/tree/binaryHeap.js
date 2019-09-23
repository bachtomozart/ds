'use strict'

class MinHeap {
  constructor(length) {
    this.last = 1;
    this.size = length; 
    this.array = new Array(length);
  }

  destroy() {
    this.last = null;
    this.array = null;
    this.size = 0;
  }

  insert(data) {
    console.log(`Inserting -> last: ${this.last} - data: ${data}`)
    this.array[this.last] = data;
    console.log(`INSERTED BF -> last - ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapBottomUp(this.last, this.array[this.last]);
    this.last++;
    console.log(`INSERTED AF -> last - ${this.last} - array: ${JSON.stringify(this.array)}`);
  }

  balanceHeapBottomUp(child, childData) {
    if(child > 0) {
      let parent = this.parent(child),
        parentData = this.array[parent];
      if(parentData > childData) {
        this.array[child] = parentData;
        this.array[parent] = childData;
        this.balanceHeapBottomUp(parent, this.array[parent]);
      }
    }
  }

  balanceHeapTopDown(parent, parentData) {
    if(parent < this.size) {
      let leftChild = this.left(parent),
        leftChildData = this.array[leftChild],
        rightChild = this.right(parent),
        rightChildData = this.array[rightChild];
      if(!leftChildData && rightChildData) {
        if(parentData > rightChildData) {
          this.array[rightChild] = parentData;
          this.array[parent] = rightChildData;
          this.balanceHeapTopDown(rightChild, this.array[rightChild]);
        }
      } else if (!rightChildData && leftChildData) {
        if(parentData > leftChildData) {
          this.array[leftChild] = parentData;
          this.array[parent] = leftChildData;
          this.balanceHeapTopDown(leftChild, this.array[leftChild]);
        }
      } else if(leftChildData && 
        rightChildData &&
        (parentData > leftChildData || 
        parentData > rightChildData)) {
        if(leftChildData < rightChildData) {
          this.array[leftChild] = parentData;
          this.array[parent] = leftChildData;
          this.balanceHeapTopDown(leftChild, this.array[leftChild]);
        } else  {
          this.array[rightChild] = parentData;
          this.array[parent] = rightChildData;
          this.balanceHeapTopDown(rightChild, this.array[rightChild]);
        }
      }
    }
  }

  extract() {
    console.log(`Extracting top value -> last: ${this.last} - value: ${this.array[1]} - array: ${JSON.stringify(this.array)}`);
    this.array[1] = this.array[this.last-1];
    this.array[this.last-1] = null;
    this.last--;
    console.log(`EXTRACTED BF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapTopDown(1, this.array[1]);
    console.log(`EXTRACTED AF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
  }

  peak() {
    console.log(`Peaking -> ${this.array[1]}`);
  }

  parent(pos) {
    if(pos % 2 === 1) {
      pos--;
    }
    return pos / 2;
  }

  left(pos) {
    return 2 * pos;
  }

  right(pos) {
    return 2 * pos + 1;
  }

  getSize() {
    return this.size;
  }
}

class MaxHeap {
  constructor(length) {
    this.last = 1;
    this.size = length; 
    this.array = new Array(length);
  }

  destroy() {
    this.last = null;
    this.array = null;
    this.size = 0;
  }

  insert(data) {
    console.log(`Inserting -> last: ${this.last} - data: ${data}`)
    this.array[this.last] = data;
    console.log(`INSERTED BF -> last - ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapBottomUp(this.last, this.array[this.last]);
    this.last++;
    console.log(`INSERTED AF -> last - ${this.last} - array: ${JSON.stringify(this.array)}`);
  }

  balanceHeapBottomUp(child, childData) {
    if(child > 0) {
      let parent = this.parent(child),
        parentData = this.array[parent];
      if(parentData < childData) {
        this.array[child] = parentData;
        this.array[parent] = childData;
        this.balanceHeapBottomUp(parent, this.array[parent]);
      }
    }
  }

  balanceHeapTopDown(parent, parentData) {
    if(parent < this.size) {
      let leftChild = this.left(parent),
        leftChildData = this.array[leftChild],
        rightChild = this.right(parent),
        rightChildData = this.array[rightChild];
      if(!leftChildData && rightChildData) {
        if(parentData < rightChildData) {
          this.array[rightChild] = parentData;
          this.array[parent] = rightChildData;
          this.balanceHeapTopDown(rightChild, this.array[rightChild]);
        }
      } else if (!rightChildData && leftChildData) {
        if(parentData < leftChildData) {
          this.array[leftChild] = parentData;
          this.array[parent] = leftChildData;
          this.balanceHeapTopDown(leftChild, this.array[leftChild]);
        }
      } else if(leftChildData && 
        rightChildData &&
        (parentData < leftChildData || 
        parentData < rightChildData)) {
        if(leftChildData > rightChildData) {
          this.array[leftChild] = parentData;
          this.array[parent] = leftChildData;
          this.balanceHeapTopDown(leftChild, this.array[leftChild]);
        } else  {
          this.array[rightChild] = parentData;
          this.array[parent] = rightChildData;
          this.balanceHeapTopDown(rightChild, this.array[rightChild]);
        }
      }
    }
  }

  extract() {
    console.log(`Extracting top value -> last: ${this.last} - value: ${this.array[1]} - array: ${JSON.stringify(this.array)}`);
    this.array[1] = this.array[this.last-1];
    this.array[this.last-1] = null;
    this.last--;
    console.log(`EXTRACTED BF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapTopDown(1, this.array[1]);
    console.log(`EXTRACTED AF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
  }

  peak() {
    console.log(`Peaking -> ${this.array[1]}`);
  }

  parent(pos) {
    if(pos % 2 === 1) {
      pos--;
    }
    return pos / 2;
  }

  left(pos) {
    return 2 * pos;
  }

  right(pos) {
    return 2 * pos + 1;
  }

  getSize() {
    return this.size;
  }
}

const demoMinHeap = () => {
  let heap = new MinHeap(10);
  heap.insert(30);
  heap.insert(20);
  heap.insert(40);
  heap.insert(50);
  heap.insert(60);
  heap.insert(10);
  heap.peak();
  heap.extract();
  heap.extract();
  heap.extract();
  heap.extract();
  heap.extract();
}
const demoMaxHeap = () => {
  let heap = new MaxHeap(10);
  heap.insert(30);
  heap.insert(20);
  heap.insert(40);
  heap.insert(50);
  heap.insert(60);
  heap.insert(10);
  heap.peak();
  heap.extract();
  heap.extract();
  heap.extract();
  heap.extract();
  heap.extract();
}
// demoMinHeap();
demoMaxHeap();