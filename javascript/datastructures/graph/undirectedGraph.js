'use strict'

const ds = require('./common');

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
      console.log(vertex + ' -> ' + this.adjacencyList
        .get(vertex)
        .reduce((acc, item) => acc + " - " + item)
      );
    }
  }

  bfs(startVertex) {
    let queue = [startVertex];
    let visited = new Set();
    while(queue.length > 0) {
      let currentVertex = queue.shift();
      if(!visited.has(currentVertex)) {
        visited.add(currentVertex);
        this.adjacencyList.get(currentVertex).forEach((item) => queue.push(item));
      }
    }
    console.log('BFS - ' + [...visited].reduce((acc, item) => acc + " -> " + item));
  }

  dfs(startVertex) {
    let stack = [startVertex];
    let visited = new Set();
    while(stack.length > 0) {
      let currentVertex = stack.pop();
      if(!visited.has(currentVertex)) {
        visited.add(currentVertex);
        this.adjacencyList.get(currentVertex).forEach((item) => stack.push(item));
      }
    }
    console.log('DFS - ' + [...visited].reduce((acc, item) => acc + " -> " + item));
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
  graph.bfs('A');
  graph.dfs('A');
};
demo();