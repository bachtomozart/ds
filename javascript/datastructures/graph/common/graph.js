'use strict'

const Vertex = require('./vertex');

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

module.exports = Graph;