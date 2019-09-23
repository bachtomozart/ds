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
    this.array[this.last] = data;
    this.balanceHeapBottomUp(this.last, this.array[this.last]);
    this.last++;
  }

  balanceHeapBottomUp(child, childData) {
    if(child > 0) {
      let parent = this.parent(child),
        parentData = this.array[parent];
      if(parentData > childData) {
        this.array[child] = parentData;
        this.array[parent] = childData;
        this.balanceHeap(parent, this.array[parent]);
      }
    }
  }

  balanceHeapTopDown(parent, parentData) {
    if(parent < this.size) {
      let leftChild = this.left(parent),
        leftChildData = this.array[leftChild];
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
    console.log(`Extracted -> ${this.array[1]}`);
    this.array[1] = this.array[this.last];
    this.last--;
    this.balanceHeapTopDown(1, this.array[1]);
  }

  peak() {
    console.log(`Peaking -> ${this.array[1]}`);
  }

  getParent(pos) {
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