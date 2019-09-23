'use strict'

class MinHeap {
  constructor(length) {
    this.size = 1;
    this.array = new Array(length);
  }

  destroy() {
    this.size = null;
    this.array = null;
  }

  insert(pos, newData) {
    let rootData = this.array[pos];
    let leftData = this.array[this.left(pos)];
    let rightData = this.array[this.right(pos)];
    if(newData < rootData) {
      if(!leftData) {
        this.array[this.left(pos)] = newData;
      } else if (!rightData) {
        this.array[this.right(pos)] = newData;
      }
    } else {
      if(leftData && newData < leftData) {
        this.insert(this.left(pos), newData);
      } else if(rightData && newData < rightData) {
        this.insert(this.right(pos), newData);
      }
    }
  }

  extract() {

  }

  peak() {

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