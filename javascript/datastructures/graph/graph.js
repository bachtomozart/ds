'use strict'

const PriorityQueue = require('../tree/priorityQueue');

class Vertex {
  constructor(value, weight = null) {
    this.value = value;
    this.weight = weight;
  }
}

class Graph {
  constructor(isUndirected = false) {
    this.initialize(isUndirected);
  }

  initialize(isUndirected = false) {
    this.adjacencyList = new Map();
    this.isUndirected = isUndirected;
    console.log(`${isUndirected ? 'Undirected' : 'Directed'} Graph has been initialized`);
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) this.adjacencyList.set(vertex, []);
  }

  addEdge(sourceVertex, destinationVertex, weight = null) {
    if (!this.adjacencyList.has(sourceVertex)) this.addVertex(sourceVertex);
    if (!this.adjacencyList.has(destinationVertex)) this.addVertex(destinationVertex);
    this.adjacencyList.get(sourceVertex).push(new Vertex(destinationVertex, weight));
    if (this.isUndirected) {
      this.adjacencyList.get(destinationVertex).push(new Vertex(sourceVertex, weight));
    }
  }

  bfs(startVertex = [...this.adjacencyList][0][0]) {
    let queue = [startVertex];
    let visited = new Set();
    while (queue.length > 0) {
      let currentVertex = queue.shift();
      if (!visited.has(currentVertex)) {
        visited.add(currentVertex);
        this.adjacencyList.get(currentVertex).forEach((item) => queue.push(item.value));
      }
    }
    console.log(`BFS -> ${[...visited]}`);
  }

  dfs(startVertex = [...this.adjacencyList][0][0]) {
    let queue = [startVertex];
    let visited = new Set();
    while (queue.length > 0) {
      let currentVertex = queue.pop();
      if (!visited.has(currentVertex)) {
        visited.add(currentVertex);
        this.adjacencyList.get(currentVertex).forEach((item) => queue.push(item.value));
      }
    }
    console.log(`DFS -> ${[...visited]}`);
  }

  topologicalSort(startVertex = [...this.adjacencyList][0][0]) {
    let stack = [];
    let visited = new Set();
    let cb = (vertex) => {
      if (!visited.has(vertex.value)) {
        visited.add(vertex.value);
        stack.unshift(vertex.value);
      }
    }
    if (startVertex) this.topologicalVisit(new Vertex(startVertex), cb);
    let vertices = this.adjacencyList.keys();
    for (let vertex of vertices) {
      this.topologicalVisit(new Vertex(vertex), cb);
    }
    console.log(`Topological Sort -> ${[...stack]}`);
  }

  topologicalVisit(vertex, cb) {
    let neighbours = this.adjacencyList.get(vertex.value);
    for (let i = 0; i < neighbours.length; i++) {
      this.topologicalVisit(neighbours[i], cb);
    }
    cb(vertex);
  }

  printGraph() {
    console.log(`${[...graph.adjacencyList].reduce((acc, item) => acc + '\n' + JSON.stringify(item), [])}`);
  }

  dijkstra(startVertex) {
    let priorityQueue = new PriorityQueue((a,b) => a.weight < b.weight);
    let distances = new Map();
    priorityQueue.enqueue(new Vertex(startVertex, 0));
    for(let vertex of this.adjacencyList.keys()) {
      let distance = startVertex === vertex ? 0 : Infinity;
      distances.set(vertex, distance);
    }

    while(priorityQueue.peek()) {
      let currentVertex = priorityQueue.dequeue();
      let neighbours = this.adjacencyList.get(currentVertex.value);
      for(let neighbour of neighbours) {
        // source weight + edge(source to destination) weight
        let travelDistance = currentVertex.weight + neighbour.weight;
        let neighbourDistance = distances.get(neighbour.value) || Infinity;
        if(travelDistance < neighbourDistance) {
          distances.set(neighbour.value, travelDistance);
          priorityQueue.enqueue(new Vertex(neighbour.value, travelDistance));
        }
      }
    }
    console.log(`Dijkstra -> ${[...distances]}`);
  }

  prims(startVertex) {
    let priorityQueue = new PriorityQueue((a,b) => a.weight < b.weight);
    let distances = new Map();
    let visited = new Set();
    priorityQueue.enqueue(new Vertex(startVertex, 0));
    for(let vertex of this.adjacencyList.keys()) {
      let distance = startVertex === vertex ? 0 : Infinity;
      distances.set(vertex, distance);
    }

    while(priorityQueue.peek()) {
      let currentVertex = priorityQueue.dequeue();
      visited.add(currentVertex.value);
      let neighbours = this.adjacencyList.get(currentVertex.value);
      for(let neighbour of neighbours) {
        // source weight + edge(source to destination) weight
        let travelDistance = neighbour.weight; // Only this changes between djikstra and prims
        let neighbourDistance = distances.get(neighbour.value) || Infinity;
        let isVisited = visited.has(neighbour.value); // Only this changes between djikstra and prims
        if(travelDistance < neighbourDistance && !isVisited) {
          distances.set(neighbour.value, travelDistance);
          priorityQueue.enqueue(new Vertex(neighbour.value, travelDistance));
        }
      }
    }
    this.printMST(startVertex, visited, distances);
  }

  printMST(startVertex, visited, distances) {
    let path = new Array();
    let distance = 0;
    for(let vertex of visited.keys()) {
      path.push(vertex);
      distance += distances.get(vertex);
    }
    console.log(`Prims ${startVertex} is done by the path ${path.join(' -> ')} with distance ${distance}`);
  }
}

const demo = () => {
  let graph = new Graph(false);
  graph.addEdge('SFO', 'DFW');
  graph.addEdge('DFW', 'JFK');
  graph.addEdge('JFK', 'LAX');
  graph.addEdge('LAX', 'SFO');
  graph.bfs();
  graph.initialize(true);
  graph.addEdge('SFO', 'DFW');
  graph.addEdge('SFO', 'JFK');
  graph.addEdge('SFO', 'LAX');
  graph.addEdge('DFW', 'JFK');
  graph.addEdge('LAX', 'JFK');
  graph.bfs();
  graph.dfs();
  graph.initialize();
  graph.addEdge('A', 'C');
  graph.addEdge('B', 'C');
  graph.addEdge('B', 'D');
  graph.addEdge('C', 'E');
  graph.addEdge('D', 'F');
  graph.addEdge('E', 'H');
  graph.addEdge('E', 'F');
  graph.addEdge('F', 'G');
  graph.topologicalSort();
  graph.initialize();
  graph.addEdge('E', 'B', 4);
  graph.addEdge('E', 'D', 2);
  graph.addEdge('B', 'A', 3);
  graph.addEdge('D', 'B', 1);
  graph.addEdge('D', 'C', 1);
  graph.addEdge('A', 'C', 6);
  graph.addEdge('A', 'D', 6);
  graph.addEdge('C', 'D', 2);
  graph.dijkstra('E');
  graph.initialize(true);
  graph.addEdge('A', 'B', 15);
  graph.addEdge('A', 'C', 20);
  graph.addEdge('B', 'C', 13);
  graph.addEdge('B', 'D', 5);
  graph.addEdge('C', 'D', 10);
  graph.addEdge('C', 'E', 6);
  graph.addEdge('D', 'E', 8);
  graph.prims('E');
}

demo();