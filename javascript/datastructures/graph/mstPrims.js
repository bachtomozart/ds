'use strict'

const Graph = require('./common/graph'),
  prepGraph = require('./common/prepGraph');

class mstPrims extends Graph {
  constructor(numberOfVertices) {
    super(numberOfVertices);
  }
}

const demo = () => {
  let graph = new mstPrims();
  prepGraph(graph, 'undirectedWeighted');
};

demo();