'use strict'

const Graph = require('./common/graph'),
  Vertex = require('./common/vertex'),
  prepGraph = require('./common/prepGraph');

class ssspBFS extends Graph {
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
      this.findSSSPByBFS(new Vertex(startVertex), null);
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
  let graph = new ssspBFS(10);
  prepGraph(graph, 'directed');
  graph.findSSSPByBFS(new Vertex('A'), null);
  graph.ssspBetween('A', 'G');
};

demo();