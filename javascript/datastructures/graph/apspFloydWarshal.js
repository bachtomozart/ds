'use strict'

const common = require('./common'),
  Graph = common.Graph,
  Vertex = common.Vertex;

class apspFloydWarshal extends Graph {
  constructor(numberOfVertices) {
    super(numberOfVertices);
    this.distanceMatrix = new Object();
  }

  initializeMatrix() {
    for(let parentKey of this.adjacencyList.keys()) {
      let neighbours = this.adjacencyList.get(parentKey);
      let neighbourMap = new Map();
      neighbours.forEach(element => {
        neighbourMap.set(element.data, element);
      });
      let neighbourArray = new Object();
      for(let childKey of this.adjacencyList.keys()) {
        if(childKey === parentKey) {
          neighbourArray[childKey] = new Vertex(childKey, 0);
        } else if (neighbourMap.has(childKey)) {
          neighbourArray[childKey] = neighbourMap.get(childKey);
        } else {
          neighbourArray[childKey] = new Vertex(childKey, Infinity);
        }
      }
      this.distanceMatrix[parentKey] = neighbourArray;
    }
    console.log(`Distance matrix initialized`);
    this.printDistanceMatrix();
  }

  findAPSP() {
    this.initializeMatrix();
    console.log(`Finding APSP - FloydWarshal`);
    for(let via of this.adjacencyList.keys()) {
      for(let parent of this.adjacencyList.keys()) {
        for(let child of this.adjacencyList.keys()) {
          let parentChildDistance = this.distanceMatrix[parent][child],
            parentViaDistance = this.distanceMatrix[parent][via],
            viaChildDistance = this.distanceMatrix[via][child],
            parentChildWeight = parentChildDistance.weight,
            viaWeight = parentViaDistance.weight + viaChildDistance.weight;
          if(viaWeight < parentChildWeight) {
            parentChildDistance.weight = viaWeight;
            parentChildDistance.parent = via;
          }
        }
      }
    }
    this.printDistanceMatrix();
  }

  printDistanceMatrix() {
    for(let parent of this.adjacencyList.keys()) {
      let row = [];
      for(let child of this.adjacencyList.keys()) {
        let record = this.distanceMatrix[parent][child];
        row.push('[' + (record.weight !== Infinity ? record.weight : 'i') + ' - ' + (record.parent !== null ? record.parent : ' ') + ']');
      }
      console.log(`${parent} -> ${row.join('\t')}`)
    }
  }

  apspBetween(startVertex, endVertex) {

  }
}

const demo = () => {
  let graph = new apspFloydWarshal(10);
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addEdge('A', 'B', 8);
  graph.addEdge('A', 'D', 1);
  graph.addEdge('B', 'C', 1);
  graph.addEdge('C', 'A', 4);
  graph.addEdge('D', 'B', 2);
  graph.addEdge('D', 'C', 9);
  graph.findAPSP();
};

demo();