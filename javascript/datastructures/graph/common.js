'use strict'

class Queue {
  constructor(size) {
    this.array = new Array(size);
  }

  enqueue(data) {
    this.array.push(data);
  }

  dequeue() {
    return this.array.shift();
  }
}

class Stack {
  constructor(size) {
    this.array = new Array(size);
  }

  push(data) {
    this.array.push(data);
  }

  pop(data) {
    return this.array.pop();
  }
}

class Vertex {
  constructor(data, weight = null, parent = null) {
    this.data = data;
    this.weight = weight;
    this.parent = parent;
  }
}

class Graph {
  constructor(numberOfVertices, isUndirected = false) {
    this.numberOfVertices = numberOfVertices;
    this.adjacencyList = new Map();
    this.isUndirected = isUndirected;
  }

  addVertex(vertex) {
    this.adjacencyList.set(vertex, new Array());
  }

  addEdge(sourceVertex, destinationVertex, weight = null) {
    this.adjacencyList.get(sourceVertex).push(new Vertex(destinationVertex, weight));
    if(this.isUndirected)  {
      this.adjacencyList.get(destinationVertex).push(new Vertex(sourceVertex, weight));
    }
  }

}

const prepGraph = (graph) => {
  // Adding vertices
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  graph.addVertex('F');
  graph.addVertex('G');
  graph.addVertex('H');
  // Adding edges
  graph.addEdge('A', 'C');
  graph.addEdge('B', 'C');
  graph.addEdge('B', 'D');
  graph.addEdge('C', 'E');
  graph.addEdge('D', 'F');
  graph.addEdge('E', 'H');
  graph.addEdge('E', 'F');
  graph.addEdge('F', 'G');
};

module.exports.Queue = Queue;
module.exports.Stack = Stack;
module.exports.Vertex = Vertex;
module.exports.Graph = Graph;
module.exports.prepGraph = prepGraph;

class SSSPNode {
  constructor(data, distance) {
    this.data = data;
    this.distance = distance;
  }
}

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
      if(parentData.distance > childData.distance) {
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
        if(parentData.distance > rightChildData.distance) {
          this.array[rightChild] = parentData;
          this.array[parent] = rightChildData;
          this.balanceHeapTopDown(rightChild, this.array[rightChild]);
        }
      } else if (!rightChildData && leftChildData) {
        if(parentData.distance > leftChildData.distance) {
          this.array[leftChild] = parentData;
          this.array[parent] = leftChildData;
          this.balanceHeapTopDown(leftChild, this.array[leftChild]);
        }
      } else if(leftChildData && 
        rightChildData &&
        (parentData.distance > leftChildData.distance || 
        parentData.distance > rightChildData.distance)) {
        if(leftChildData.distance < rightChildData.distance) {
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
    console.log(`Extracting top value -> last: ${this.last} - value: ${JSON.stringify(this.array[1])} - array: ${JSON.stringify(this.array)}`);
    const result = this.array[1];
    this.array[1] = this.array[this.last-1];
    this.array[this.last-1] = null;
    this.last--;
    console.log(`EXTRACTED BF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
    this.balanceHeapTopDown(1, this.array[1]);
    console.log(`EXTRACTED AF -> last: ${this.last} - array: ${JSON.stringify(this.array)}`);
    return result;
  }

  peak() {
    console.log(`Peaking -> ${JSON.stringify(this.array[1])}`);
    return this.array[1];
  }

  updateWeight(data, distance) {
    for(let i = 1; i < this.array.length; i++) {
      if(this.array[i].data === data) {
        this.array[i].distance = distance;
        console.log(`UPDATED BF -> data - ${distance} - array: ${JSON.stringify(this.array)}`);
        this.balanceHeapBottomUp(i, this.array[i]);
        console.log(`UPDATED AF -> data - ${distance} - array: ${JSON.stringify(this.array)}`);
        break;
      }
    }
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

module.exports.MinHeap = MinHeap;
module.exports.SSSPNode = SSSPNode;