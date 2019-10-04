'use strict'

const common = require('./common'),
  Graph = common.Graph,
  Vertex = common.Vertex,
  SSSPNode = common.SSSPNode,
  MinHeap = common.MinHeap;

class ssspDijkstra extends Graph {

  constructor(numberOfVertices) {
    super(numberOfVertices);
    this.heap = new MinHeap(numberOfVertices + 2);
    this.distances = new Map();
  }

  findSSSP(startVertex) {
    this.initializeHeap(startVertex);
    while(this.heap.peak()) {
      let top = this.heap.extract();
      let adjacentVertices = this.adjacencyList.get(top.data);
      for(let adjacentVertex of adjacentVertices) {
        let currentTravel = top.distance + adjacentVertex.weight;
        let currentDistance = this.distances.get(adjacentVertex.data);
        if(currentTravel < currentDistance.distance) {
          currentDistance.distance = currentTravel;
          // set distance parent
          currentDistance.data = top.data;
          // set vertex parent
          adjacentVertex.parent = top.data;
        }
      }
      for(let i=1;i<this.heap.array.length;i++) {
        if (this.heap.array[i]) {
          this.heap.array[i].distance = this.distances.get(this.heap.array[i].data).distance;
        }
      }
      this.heap.balanceHeapTopDown(1, this.heap.array[1]);
    }
    return this.distances;
  }

  initializeHeap(startVertex) {
    this.heap = new MinHeap(this.numberOfVertices);
    for(let vertex of this.adjacencyList.keys()) {
      let ssspNode = new SSSPNode(vertex, Infinity)
      if(vertex === startVertex.data) ssspNode.distance = 0;
      this.heap.insert(ssspNode);
      this.distances.set(vertex, new SSSPNode(null, Infinity));
    }
  }

  ssspBetween(startVertexData, endVertexData) {
    let startVertex = new SSSPNode(startVertexData, 0);
    let endVertex = new SSSPNode(endVertexData, this.distances.get(endVertexData).distance);
    if(!this.distances) {
      this.findSSSP(startVertex);
    }
    if(!this.distances.get(endVertex.data)) {
      console.log(`${endVertex.data} cannot be reached from ${startVertex.data}`);
    }
    let path = [endVertex]
    let parentVertex = this.distances.get(endVertex.data)
    while(parentVertex.data !== startVertex.data) {
      path.push(parentVertex)
      parentVertex = this.distances.get(parentVertex.data);
    }
    path.push(startVertex);
    let pathString = [];
    let pathDistance = 0;
    for(let i = path.length-1;i>=0;i--) {
      pathString.push(path[i].parent);
      pathDistance += path[i].distance;
    }
    console.log(`Shortest Path between ${startVertex.data} and ${endVertex.data} is ${pathString.join(' -> ')} with distance ${pathDistance} `)
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
  graph.findSSSP(new Vertex('E'));
  graph.ssspBetween('E', 'A');
};
demo();