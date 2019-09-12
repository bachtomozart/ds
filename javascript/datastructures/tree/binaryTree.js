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

  preOrderTraversal(node) {
    if(!node) {
      return null;
    } else {
      console.log(node.data);
      this.preOrderTraversal(node.left);
      this.preOrderTraversal(node.right);
    }
  }

  inOrderTraversal(node) {
    if(!node) {
      return null;
    } else {
      this.inOrderTraversal(node.left);
      console.log(node.data);
      this.inOrderTraversal(node.right);
    }
  }

  outOrderTraversal(node) {
    if(!node) {
      return null;
    } else {
      this.outOrderTraversal(node.right);
      console.log(node.data);
      this.outOrderTraversal(node.left);
    }
  }

  postOrderTraversal(node) {
    if(!node) {
      return null;
    } else {
      this.postOrderTraversal(node.left);
      this.postOrderTraversal(node.right);
      console.log(node.data);
    }
  }

  // Level order traversal
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
}

// export { BinaryTree, demoBinaryTree }

demoBinaryTree();