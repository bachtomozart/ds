'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    let newNode = new Node(data);
    if(!this.root) {
      this.root = newNode;
    } else {
      let parent = this.findFirstEligibleParent(this.root, data);
      if(data < parent.data) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }
  }

  findFirstEligibleParent(node, data) {
    if(!node) {
      return null;
    } else {
      if(data <= node.data) {
        if(node.left) {
          return this.findFirstEligibleParent(node.left, data);
        } else {
          return node;
        }
      } else {
        if (node.right) {
          return this.findFirstEligibleParent(node.right, data);
        } else {
          return node;
        }
      } 
    }
  }

  printTree() {
    let startNode = this.root, values = [];
    this.inorderTraversal(this.root, (node) => values.push(node.data));
    console.log(JSON.stringify(values));
  }

  inorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.inorderTraversal(node.left, cb);
      cb(node);
      this.inorderTraversal(node.right, cb);
    }
  }

  searchTree(data) {
    let startNode = this.root,
    searchResult = this.search(startNode, data);
    searchResult !== null ? console.log(`The given value ${data} has been found`) : console.log(`The value ${data} could not be found`);
  }

  search(node, data) {
    console.log(`search - ${node !== null ? node.data : null}`);
    if(!node) {
      return null;
    } else {
      if(data === node.data) {
        return node;
      } else if(data < node.data) {
        return this.search(node.left, data);
      } else if (data > node.data) {
        return this.search(node.right, data);
      }
    }
  }
}

const demoBinarySearchTree = () => {
  let bst = new BinarySearchTree();
  bst.insert(10);
  bst.insert(5);
  bst.insert(3);
  bst.insert(7);
  bst.insert(6);
  bst.insert(8);
  bst.insert(9);
  bst.insert(4);
  bst.insert(2);
  bst.insert(1);
  bst.insert(15);
  console.log(JSON.stringify(bst.root));
  bst.printTree();
  bst.searchTree(9);
}

demoBinarySearchTree();