'use strict'

class UndirectedGraph {
  constructor(numberOfVertices) {
    this.numberOfVertices = numberOfVertices;
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    this.adjacencyList.set(vertex, new Array());
  }

  addEdge(sourceVertex, destinationVertex) {
    this.adjacencyList.get(sourceVertex).push(destinationVertex);
    // because it's undirected
    this.adjacencyList.get(destinationVertex).push(sourceVertex);
  }

  printGraph() {
    for(let vertex of this.adjacencyList.keys()) {
      console.log(vertex + ' -> ' + this.adjacencyList.get(vertex).reduce((acc, item) => acc + " - " + item));
    }
  }

  bfs() {

  }

  dfs() {

  }
}

const demo = () => {
  let graph = new UndirectedGraph(10); 
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'C');
  graph.addEdge('A', 'D');
  graph.addEdge('B', 'C');
  graph.addEdge('D', 'C');
  graph.printGraph();
}

demo();