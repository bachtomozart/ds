'use strict'

const Graph = require('./common/graph'),
  DisjointSet = require('./common/disjointSet'),
  prepGraph = require('./common/prepGraph');

class mstKruskals extends Graph {
  constructor(numberOfVertices) {
    super(numberOfVertices, true);
    this.disjointSet = new DisjointSet();
    this.edges = new Array();
    this.mstDistance = 0;
  }

  findMST() {
    this.initializeDisjointSetAndEdges();
    // Sort Edges by their weight
    this.edges.sort((a,b) => a.weight - b.weight);
    // Kruskals
    for(let edge of this.edges) {
      let source = edge.parent,
        destination = edge.data,
        distance = edge.weight,
        sourceKeeper = this.disjointSet.findSet(source),
        destinationKeeper = this.disjointSet.findSet(destination);
      if(sourceKeeper !== destinationKeeper) {
        this.disjointSet.union(source, destination);
        this.mstDistance += distance;
      }
    }
  }

  initializeDisjointSetAndEdges() {
    let vertices = [...this.adjacencyList.keys()];
    this.disjointSet.makeSet(vertices);
    for(let vertex of vertices) {
      let edges = this.adjacencyList.get(vertex);
      edges.forEach((item) => item.parent = vertex);
      this.edges.push(...edges);
    }
    console.log(`Disjoint Set and Edges have been initialized`);
  }

  printMST() {
    const vertices = [...this.adjacencyList.keys()];
    const verticesSet = [...this.disjointSet.getSet(this.disjointSet.findSet(vertices[0]))];
    console.log(`The MST for ${JSON.stringify(vertices)} is ${this.mstDistance} with set ${JSON.stringify(verticesSet)}`)
  }
}

const demo = () => {
  let graph = new mstKruskals(5);
  prepGraph(graph, 'undirectedWeighted');
  graph.findMST();
  graph.printMST();
}

demo();