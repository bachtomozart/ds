'use strict'

const common = require('./common'),
  Vertex = common.Vertex,
  Graph = common.Graph,
  prepGraph = common.prepGraph;

class ssspBFSGraph extends Graph {
  constructor(numberOfVertices) {
    super(numberOfVertices);
    this.parents = null;
  }

  findSSSPByBFS(startVertex, parentVertex) {
    let queue = [startVertex];
    let parents = new Map();
    while(queue.length > 0) {
      let currentVertex = queue.shift();
      if(!parents.has(currentVertex.data)) {
        parents.set(currentVertex.data, parentVertex);
        let currentVertices = this.adjacencyList.get(currentVertex.data);
        currentVertices.forEach((item) => { 
          item.parent = currentVertex.data;
          queue.push(item);
        });
        if (currentVertices.length) parentVertex = currentVertex.data;
      }
    }
    for(let [key, value] of this.adjacencyList.entries()) {
      console.log(`${key} - ${value.reduce((acc, item) => acc + "[data:" + item.data + " parent:" + item.parent  + "]\t", [])}`)
    }
    this.parents = parents;
  }

  ssspBetween(startVertex, endVertex) {
    if(!this.parents) {
      this.findSSSPByBFS(startVertex, null);
    }
    if(!this.parents.has(endVertex)) {
      console.log(`${endVertex} could not be reached from ${startVertex}`);
    }
    let path = [endVertex];
    let parent = this.parents.get(endVertex);
    while(parent !== startVertex) {
      path.push(parent);
      parent = this.parents.get(parent);
    }
    path.push(startVertex);
    console.log(`Shortest path between ${startVertex} and ${endVertex} = ${path.reduceRight((acc, item) => acc + " -> " + item)}`);
  }

}

const demo = () => {
  let graph = new ssspBFSGraph(10);
  prepGraph(graph);
  let startVertex = new Vertex('A');
  graph.findSSSPByBFS(startVertex, startVertex.parent);
  graph.ssspBetween('A', 'G');
};

demo();