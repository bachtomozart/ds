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

  findParent(node, data) {
    if(!node) {
      return null;
    } else {
      if(data <= node.data) {
        if(node.left) {
          if(node.left.data === data) {
            return node;
          } else {
            return this.findParent(node.left, data);
          }
        } else {
          return null;
        }
      } else {
        if (node.right) {
          if (node.right.data === data) {
            return node;
          } else {
            return this.findParent(node.right, data);
          }
        } else {
          return null;
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

  deleteNode(data) {
    let rootNode = this.root;
    let searchNode = this.search(rootNode, data);
    if(!searchNode) {
      console.log(`DELETE - The given value ${data} could not be found`);
    } else {
      let parentNode = this.findParent(rootNode, data);
      if(!searchNode.left && !searchNode.right) {
        console.log(`DELETE - The given node is a leaf node, deleting it`);
        if(parentNode.left.data === data) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
        searchNode = null;
      } else if (searchNode.left && searchNode.right) {
        console.log(`DELETE - The given node has two children ${searchNode.left.data} and ${searchNode.right.data}`);
        // find successor
        let successor = this.findSuccessor(searchNode, searchNode.data);
        // recursively delete the successor
        this.deleteNode(successor.data);
        searchNode.data = successor.data;
        searchNode = null;
      } else if (searchNode.left && !searchNode.right) {
        if(parentNode.left.data === searchNode.data) {
          console.log(`DELETE - The given node has one child ${searchNode.left.data}, swapping it`);
          parentNode.left = searchNode.left;
          searchNode = null;
        }
      } else if (!searchNode.left && searchNode.right) {
        if(parentNode.right.data === searchNode.data) {
          console.log(`DELETE - The given node has one child ${searchNode.right.data}, swapping it`);
          parentNode.right = searchNode.right;
          searchNode = null;
        }
      }
    }
  }

  findSuccessor(node, data) {
    if(!node) { 
      return null;
    } else {
      if (node.data === data) {
        return this.findSuccessor(node.right, data);  
      } else { 
        if (node.left) {
          return this.findSuccessor(node.left, data);
        } else {
          return node;
        }
      }
    }
  }

  heighOfNode(node) {
    if(!node) return 0;
    let left = this.heighOfNode(node.left);
    let right = this.heighOfNode(node.right);
    return Math.max(left, right) + 1;
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
  bst.insert(13);
  bst.insert(17);
  bst.insert(12);
  bst.insert(14);
  bst.insert(11);
  bst.insert(18);
  bst.insert(19);
  bst.insert(16);
  bst.printTree();
  bst.searchTree(9);
  bst.deleteNode(1);bst.printTree();console.log(JSON.stringify(bst.root));
  bst.deleteNode(7);bst.printTree();console.log(JSON.stringify(bst.root));
  bst.deleteNode(13);bst.printTree();console.log(JSON.stringify(bst.root));
  bst.deleteNode(18);bst.printTree();console.log(JSON.stringify(bst.root));
  bst.insert(13);bst.printTree();console.log(JSON.stringify(bst.root));

}

demoBinarySearchTree();