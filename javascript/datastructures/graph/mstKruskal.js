'use strict'

const Graph = require('./common/graph'),
  Vertex = require('./common/vertex'),
  DisjointNode = require('./common/disjointNode'),
  DisjointSet = require('./common/disjointSet'),
  prepGraph = require('./common/prepGraph');

class mstKruskal extends Graph {
  constructor(numberOfVertices) {
    super(numberOfVertices, true);
    this.disjointSet = new DisjointSet();
    this.edges = new Array();
  }

  findMST() {
    this.initializeDisjointSetAndEdges();
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

  }
}

const demo = () => {
  let graph = new mstKruskal(5);
  prepGraph(graph, 'undirectedWeighted');
  graph.findMST();
}

demo();