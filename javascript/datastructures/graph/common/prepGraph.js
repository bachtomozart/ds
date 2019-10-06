'use strict'

const prepGraph = (graph, graphType) => {
  if(graphType === 'directed') {
    // Adding vertices
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    // Adding edges
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'H');
    graph.addEdge('E', 'F');
    graph.addEdge('F', 'G');
  } else if (graphType === 'weighted') {
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
  } else if (graphType === 'negativeCycle') {
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
    graph.addEdge('A', 'D', -6);
    graph.addEdge('C', 'D', 2);
  } else if (graphType === 'condensed') {
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
  } else if (graphType === 'undirectedWeighted') {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addEdge('A', 'B', 15);
    graph.addEdge('A', 'C', 20);
    graph.addEdge('B', 'C', 13);
    graph.addEdge('B', 'D', 5);
    graph.addEdge('C', 'D', 10);
    graph.addEdge('C', 'E', 6);
    graph.addEdge('D', 'E', 8);
  }
};

module.exports = prepGraph;