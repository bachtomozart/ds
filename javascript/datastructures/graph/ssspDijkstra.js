'use strict'

const Graph = require('./common/graph'),
  Vertex = require('./common/vertex'),
  MinHeap = require('./common/minHeap'),
  prepGraph = require('./common/prepGraph');

class ssspDijkstra extends Graph {

  constructor(numberOfVertices, chatty = false) {
    super(numberOfVertices);
    this.heap = new MinHeap(numberOfVertices + 2);
    this.distances = new Map();
    this.chatty = chatty;
  }

  findSSSP(sourceVertex) {
    console.log(`Find SSSP - Dijkstra`);
    this.initializeHeapAndDistances(sourceVertex);
    while(this.heap.peek()) {
      let currentVertex = this.heap.extract();
      if(this.chatty) console.log(`Processing ${JSON.stringify(currentVertex)}`);
      let neighbours = this.adjacencyList.get(currentVertex.data);
      if(this.chatty) console.log(`Neighbours for '${currentVertex.data}' is ${JSON.stringify(neighbours)}`)
      for(let neighbour of neighbours) {
        let currentTravel = currentVertex.weight + neighbour.weight;
        let currentDistance = this.distances.get(neighbour.data);
        if(currentTravel < currentDistance.weight) {
          if(this.chatty) console.log(`------------`)
          if(this.chatty) console.log(`\tNew shortest path found between ${currentVertex.data} and ${neighbour.data} - newDistance: ${currentTravel} oldDistance:${currentDistance.weight}`)
          if(this.chatty) console.log(`\tDistances Before Update -> ${JSON.stringify([...this.distances.entries()])}`);
          currentDistance.weight = currentTravel;
          currentDistance.parent = currentVertex.data;
          if(this.chatty) console.log(`\tDistances After Update -> ${JSON.stringify([...this.distances.entries()])}`);
          neighbour.parent = currentVertex.data;
          if(this.chatty) console.log(`\tNeighbours After Update -> ${JSON.stringify(neighbours)}`)
          if(this.chatty) console.log(`------------`)
        }
      }
      // Update MinHeap members with the latest distances
      this.heap.updateMembers(this.distances);
      if(this.chatty) console.log('\n');
    }
    return this.distances;
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

  ssspBetween(startVertex, endVertex) {
    let path = [];
    let parent = this.distances.get(endVertex);
    while(parent.parent !== startVertex) {
      path.unshift(parent);
      parent = this.distances.get(parent.parent);
    }
    path.unshift(parent);
    path.unshift(this.distances.get(startVertex));
    let pathString = path.map((item) => item.data);
    let pathWeight = this.distances.get(endVertex).weight;
    console.log(`Shortest Path between ${startVertex} and ${endVertex} is ${JSON.stringify(pathString.join(' -> '))} with distance ${pathWeight}`);
  }

}

const demo = () => {
  let graph = new ssspDijkstra(10);
  prepGraph(graph, 'weighted');
  graph.findSSSP('E');
  graph.ssspBetween('E', 'A');
  graph.ssspBetween('E', 'B');
};
demo();