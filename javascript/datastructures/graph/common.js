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