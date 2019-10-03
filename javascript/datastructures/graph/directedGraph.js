'use strict'

class DirectedGraph {
  constructor(numberOfVertices) {
    this.numberOfVertices = numberOfVertices;
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    this.adjacencyList.set(vertex, new Array());
  }

  addEdge(startVertex, destinationVertex) {
    this.adjacencyList.get(startVertex).push(destinationVertex);
  }

  topologicalSort() {
    let stack = [];
    let visited = new Set();
    let vertices = this.adjacencyList.keys();
    for(let vertex of vertices) {
      this.topologicalVisit(vertex, stack, visited);
    }
    console.log('Topological Sort - ' + stack.reduceRight((acc, item) => acc + " -> " + item));
  }

  topologicalVisit(vertex, stack, visited) {
    let neighbours = this.adjacencyList.get(vertex);
    for(let i=0;i<neighbours.length;i++) {
      this.topologicalVisit(neighbours[i], stack, visited);
    }
    if(!visited.has(vertex)) {
      visited.add(vertex);
      stack.push(vertex);
    }
  }

}

const demo = () => {
  let graph = new DirectedGraph(10);
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
  // topological sort
  graph.topologicalSort('A');
};

demo();