class Vertex {
  constructor(data, weight = null, parent = null) {
    this.data = data;
    this.weight = weight;
    this.parent = parent;
  }
}

module.exports = Vertex;