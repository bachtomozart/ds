'use strict'

const Graph = require('./common/graph'),
  Vertex = require('./common/vertex'),
  MinHeap = require('./common/minHeap'),
  prepGraph = require('./common/prepGraph');

class mstPrims extends Graph {
  constructor(numberOfVertices) {
    super(numberOfVertices, true);
    this.heap = new MinHeap(numberOfVertices * 2);
    this.distances = new Map();
    this.visited = new Set();
  }

  findMST(sourceVertex) {
    this.initializeHeapAndDistances(sourceVertex);
    while(this.heap.peek()) {
      let currentVertex = this.heap.extract();
      this.visited.add(currentVertex.data);
      let adjacentVertices = this.adjacencyList.get(currentVertex.data);
      for(let adjacentVertex of adjacentVertices) {
        let currentDistance = this.distances.get(adjacentVertex.data),
          currentWeight = adjacentVertex.weight,
          isVisited = this.visited.has(adjacentVertex.data);
        if(currentWeight < currentDistance.weight && !isVisited) {
          currentDistance.weight = currentWeight;
          currentDistance.parent = currentVertex.data;
        }
      }
      this.heap.updateMembers(this.distances);
    }
  }

  initializeHeapAndDistances(sourceVertex) {
    this.heap = new MinHeap(this.adjacencyList.size * 2);
    for(let vertex of this.adjacencyList.keys()) {
      let weight = Infinity;
      if (vertex === sourceVertex) weight = 0;
      this.heap.insert(new Vertex(vertex, weight));
      this.distances.set(vertex, new Vertex(vertex, weight));
    }
    console.log(`Initialized Heap And Distances`);
    if(this.chatty) console.log(`Distances -> ${JSON.stringify([...this.distances.entries()])}`);
  }

  printMST(sourceVertex) {
    let path = new Array();
    let distance = 0;
    for(let vertex of this.visited.keys()) {
      path.push(vertex);
      distance += this.distances.get(vertex).weight;
    }
    console.log(`The MST for ${sourceVertex} is done by the path ${path.join(' -> ')} with distance ${distance}`);
  }
}

const demo = () => {
  let graph = new mstPrims(5);
  prepGraph(graph, 'undirectedWeighted');
  let sourceVertex = 'A';
  graph.findMST(sourceVertex);
  graph.printMST(sourceVertex);
};

demo();