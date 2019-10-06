'use strict'

class MinHeap {
  constructor(length, chatty = false) {
    this.last = 1;
    this.size = length; 
    this.array = new Array(length);
    this.chatty = chatty;
  }

  destroy() {
    this.last = null;
    this.array = null;
    this.size = 0;
  }

  insert(data) {
    if(this.chatty) console.log(`Inserting -> last: ${this.last} - data: ${data}`)
    this.array[this.last] = data;
    // console.log(`INSERTED BF -> last - ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapBottomUp(this.last, this.array[this.last]);
    this.last++;
    // console.log(`INSERTED AF -> last - ${this.last} - array: ${JSON.stringify(this.array)}`);
  }

  balanceHeapBottomUp(child, childData) {
    if(child > 0) {
      let parent = this.parent(child),
        parentData = this.array[parent];
      if(parentData.weight > childData.weight) {
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
        if(parentData.weight > rightChildData.weight) {
          this.array[rightChild] = parentData;
          this.array[parent] = rightChildData;
          this.balanceHeapTopDown(rightChild, this.array[rightChild]);
        }
      } else if (!rightChildData && leftChildData) {
        if(parentData.weight > leftChildData.weight) {
          this.array[leftChild] = parentData;
          this.array[parent] = leftChildData;
          this.balanceHeapTopDown(leftChild, this.array[leftChild]);
        }
      } else if(leftChildData && 
        rightChildData &&
        (parentData.weight > leftChildData.weight || 
        parentData.weight > rightChildData.weight)) {
        if(leftChildData.weight < rightChildData.weight) {
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
    if(this.chatty) console.log(`Extracting top value -> last: ${this.last} - value: ${JSON.stringify(this.array[1])} - array: ${JSON.stringify(this.array)}`);
    const result = this.array[1];
    this.array[1] = this.array[this.last-1];
    this.array[this.last-1] = null;
    this.last--;
    if(this.chatty) console.log(`EXTRACTED '${result.data}' BF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapTopDown(1, this.array[1]);
    if(this.chatty) console.log(`EXTRACTED '${result.data}' AF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
    return result;
  }

  peek() {
    if(this.chatty) console.log(`Peeking -> ${JSON.stringify(this.array[1])}`);
    return this.array[1];
  }

  parent(pos) {
    if(pos > 1) {
      if(pos % 2 === 1) {
        pos--;
      }
      return pos / 2;
    } else {
      return pos;
    }
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

module.exports = MinHeap;