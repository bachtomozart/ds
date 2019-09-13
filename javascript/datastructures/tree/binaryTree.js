'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    let node = new Node(data);
    if(this.root) {
      let parent = this.findFirstEligibleParent(this.root);
      console.log('parent -> ' + parent);
      if(parent.left) {
        parent.right = node;
      } else {
        parent.left = node;
      }
    } else {
      this.root = node;
    }
    console.log('After add -> ' + JSON.stringify(this.root));
  }

  delete(data) {
    let parent = this.findParent(this.root, data);
    console.log('parent -> ' + parent);
    if(!parent) {
      console.log('The given node could not be found in the tree');
    } else if(parent.left.data === data) {
      parent.left = null;
      console.log('After delete -> ' + JSON.stringify(this.root));
    } else {
      parent.right = null;
      console.log('After delete -> ' + JSON.stringify(this.root));
    }
  }

  destroy() {
    this.root = null;
  }

  preOrderTraversal(node) {
    if(!node) {
      // console.log('Tree is empty');
      return null;
    } else {
      console.log(node.data);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  inOrderTraversal(node) {
    if(!node) {
      // console.log('Tree is empty');
      return null;
    } else {
      this.inOrderTraversal(node.left);
      console.log(node.data);
      this.inOrderTraversal(node.right);
    }
  }

  outOrderTraversal(node) {
    if(!node) {
      // console.log('Tree is empty');
      return null;
    } else {
      this.outOrderTraversal(node.right);
      console.log(node.data);
      this.outOrderTraversal(node.left);
    }
  }

  postOrderTraversal(node) {
    if(!node) {
      // console.log('Tree is empty');
      return null;
    } else {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.data);
    }
  }

  levelOrderTraversal(node) {
    if(!node) {
      // console.log('Tree is empty');
      return null;
    } else {
      let queue = [node];
      while(queue.length > 0) {
        let childrenQueue = [];
        for(let node of queue) {
          if(node) {          
            // add left node
            childrenQueue.push(node.left);
            // add right node
            childrenQueue.push(node.right);
            // print node data
            console.log(node.data);
            // remove parent
          }
        }
        queue = childrenQueue;
      }
    }
  }

  findParent(node, data) {
    let queue = [node];
    console.log('queue length -> ' + queue.length);
    console.log(JSON.stringify(queue));
    while(queue.length > 0) {
      let childrenQueue = [];
      for(let node of queue) {
        if(node) {
          console.log('findParent -> ' + JSON.stringify(node));
          if(node.left.data !== data) {
            childrenQueue.push(node.left);
          } else {
            return node;
          }
          if(node.right.data !== data) {
            childrenQueue.push(node.right);
          } else {
            return node;
          }
        }
      }
      queue = childrenQueue;
    }
  }

  findFirstEligibleParent(node) {
    let queue = [node];
    console.log('queue length -> ' + queue.length);
    console.log(JSON.stringify(queue));
    while(queue.length > 0) {
      let childrenQueue = [];
      for(let node of queue) {
        if(node.left) {
          childrenQueue.push(node.left);
        } else {
          return node;
        }
        if(node.right) {
          childrenQueue.push(node.right);
        } else {
          return node;
        }
      }
      queue = childrenQueue;
    }
  }
}

const demoBinaryTree = () => {
  console.log('Demo Binary Tree');
  let tree = new BinaryTree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);
  tree.insert(6);
  tree.insert(7);
  console.log('Pre Order Traversal');
  tree.preOrderTraversal(tree.root);
  console.log('In Order Traversal');
  tree.inOrderTraversal(tree.root);
  console.log('Out Order Traversal');
  tree.outOrderTraversal(tree.root);
  console.log('Post Order Traversal');
  tree.postOrderTraversal(tree.root);
  console.log('Level Order Traversal');
  tree.levelOrderTraversal(tree.root);
  tree.delete(6);
  console.log('Pre Order Traversal');
  tree.preOrderTraversal(tree.root);
  console.log('In Order Traversal');
  tree.inOrderTraversal(tree.root);
  console.log('Out Order Traversal');
  tree.outOrderTraversal(tree.root);
  console.log('Post Order Traversal');
  tree.postOrderTraversal(tree.root);
  console.log('Level Order Traversal');
  tree.levelOrderTraversal(tree.root);
}

// export { BinaryTree, demoBinaryTree }

demoBinaryTree();