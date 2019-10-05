'use strict'

const common = require('./common'),
  Graph = common.Graph,
  Vertex = common.Vertex,
  MinHeap = common.MinHeap;

class ssspDijkstra extends Graph {

  constructor(numberOfVertices) {
    super(numberOfVertices);
    this.heap = new MinHeap(numberOfVertices + 2);
    this.distances = new Map();
  }

  findSSSP(sourceVertex) {
    this.initializeHeapAndDistances(sourceVertex);
    console.log(`Find SSSP - Dijkstra\n`);
    while(this.heap.peek()) {
      let currentVertex = this.heap.extract();
      console.log(`Processing ${JSON.stringify(currentVertex)}`);
      let neighbours = this.adjacencyList.get(currentVertex.data);
      console.log(`Neighbours for '${currentVertex.data}' is ${JSON.stringify(neighbours)}`)
      for(let neighbour of neighbours) {
        let currentTravel = currentVertex.weight + neighbour.weight;
        let currentDistance = this.distances.get(neighbour.data);
        if(currentTravel < currentDistance.weight) {
          console.log(`------------`)
          console.log(`\tThe shortest path found between ${currentVertex.data} and ${neighbour.data} - newDistance: ${currentTravel} oldDistance:${currentDistance.weight}`)
          console.log(`\tDistances Before Update -> ${JSON.stringify([...this.distances.entries()])}`);
          currentDistance.weight = currentTravel;
          currentDistance.parent = currentVertex.data;
          console.log(`\tDistances After Update -> ${JSON.stringify([...this.distances.entries()])}`);
          neighbour.parent = currentVertex.data;
          console.log(`\tNeighbours After Update -> ${JSON.stringify(neighbours)}`)
          console.log(`------------`)
        }
      }
      console.log(`Heap Array before update -> ${JSON.stringify(this.heap.array)}`);
      for(let i=1;i<this.heap.array.length;i++) {
        if(this.heap.array[i]) {
          this.heap.array[i].weight = this.distances.get(this.heap.array[i].data).weight;
          this.heap.array[i].parent = this.distances.get(this.heap.array[i].data).parent;
        }
      }
      console.log(`Heap Array after update -> ${JSON.stringify(this.heap.array)}`);
      this.heap.balanceHeapBottomUp(this.heap.last-1, this.heap.array[this.heap.last-1]);
      console.log(`Heap Array after balancing -> ${JSON.stringify(this.heap.array)}`);
      console.log('\n');
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
    console.log(`\nInitialized Heap And Distances`);
    console.log(`Distances -> ${JSON.stringify([...this.distances.entries()])}`);
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
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  graph.addEdge('E', 'B', 4);
  graph.addEdge('E', 'D', 2);
  graph.addEdge('B', 'A', 3);
  graph.addEdge('D', 'B', 1);
  graph.addEdge('D', 'C', 1);
  graph.addEdge('A', 'C', 6);
  graph.addEdge('A', 'D', 6);
  graph.addEdge('C', 'D', 2);
  graph.findSSSP('E');
  graph.ssspBetween('E', 'A');
  graph.ssspBetween('E', 'B');
};
demo();