'use strict'

const common = require('./common'),
  Graph = common.Graph,
  Vertex = common.Vertex,
  prepWeightedGraph = common.prepWeightedGraph,
  prepNegativeCycleGraph = common.prepNegativeCycleGraph;

class ssspBellmanFord extends Graph {

  constructor(numberOfVertices) {
    super(numberOfVertices);
    this.distances = new Map();
    this.edges = new Array();
  }

  initializeDistances(sourceVertex) {
    for(let vertex of this.adjacencyList.keys()) {
      // Initialize Distances
      let weight = Infinity;
      if(vertex === sourceVertex) weight = 0;
      this.distances.set(vertex, new Vertex(vertex, weight));
      // Initialize Edges
      let adjacentVertices = this.adjacencyList.get(vertex);
      adjacentVertices.forEach((item) => item.parent = vertex);
      this.edges.push(...adjacentVertices);
    }
    console.log(`Distances Initialized -> ${JSON.stringify([...this.distances.entries()])}`)
    console.log(`Edges Initialized -> ${JSON.stringify(this.edges)}`)
  }

  findSSSP(sourceVertex) {
    this.initializeDistances(sourceVertex);
    const maxIterations = this.distances.size - 1;
    let hasNegativeCycle = false;
    for(let i = 0; i < maxIterations; i++) {
      for(let edge of this.edges) {
        let 
          // Edge Values
          source = edge.parent,
          destination = edge.data,
          sourceToDestinationWeight = edge.weight,
          // Distances
          sourceDistance = this.distances.get(source),
          destinationDistance = this.distances.get(destination),
          // Computation
          travel = sourceDistance.weight + sourceToDestinationWeight;
        // Check and update distance
        if(travel < destinationDistance.weight) {
          destinationDistance.weight = travel;
          destinationDistance.parent = source;
        }
      }
    }
    for(let edge of this.edges) {
      let 
        // Edge Values
        source = edge.parent,
        destination = edge.data,
        sourceToDestinationWeight = edge.weight,
        // Distances
        sourceDistance = this.distances.get(source),
        destinationDistance = this.distances.get(destination),
        // Computation
        travel = sourceDistance.weight + sourceToDestinationWeight;
      // Check and update distance
      if(travel < destinationDistance.weight) {
        hasNegativeCycle = true;
      }
    }
    return hasNegativeCycle;
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
    console.log(`Shortest path between ${startVertex} and ${endVertex} is ${pathString.join(' -> ')} with distance ${pathWeight}`);
  }

}

const demo = () => {
  let graph = new ssspBellmanFord(10);
  // prepWeightedGraph(graph);
  prepNegativeCycleGraph(graph);
  let hasNegativeCycle = graph.findSSSP('E');
  if (!hasNegativeCycle) {
    graph.ssspBetween('E', 'A');
  } else {
    console.log(`The graph has negative cycle`);
  }
};

demo();