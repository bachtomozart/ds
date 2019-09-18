'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.balance = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  insert(node, data) {
    // insert node
    if(!this.root) {
      this.root = new Node(data);
      node = this.root;
    } else if(data <= node.data) {
      if(node.left) {
        this.insert(node.left, data);
      } else {
        node.left = new Node(data);
        node.left.balance = this.calculateBalance(node.left);
      }
    } else {
      if(node.right) {
        this.insert(node.right, data);
      } else {
        node.right = new Node(data);
        node.right.balance = this.calculateBalance(node.right);
      }
    }

    // calculate balance
    node.balance = this.calculateBalance(node);

    // balancing
    if(node.balance > 1) {
      let llBalance = this.calculateBalance(node.left.left);
      let lrBalance = this.calculateBalance(node.left.right);
      if(llBalance > lrBalance) {
        // LL Rotation
        this.rightRotate(node);
      } else {
        // LR Rotation
        this.leftRotate(node.left);
        this.rightRotate(node);
      }
    } else if (node.balance < -1) {
      let rrBalance = this.calculateBalance(node.right.right);
      let rlBalance = this.calculateBalance(node.right.left);
      if(rrBalance > rlBalance) {
        // RR Rotation
        this.leftRotate(node);
      } else {
        // RL Rotation
        this.rightRotate(node.right);
        this.leftRotate(node);
      }
    }
  }

  leftRotate(node) {

  }

  rightRotate(node) {

  }

  calculateBalance(node) {
    if (!node) return -1;
    return this.height(node.left) - this.height(node.right);
  }

  height(node) {
    if(!node) return -1;
    let left = this.height(node.left);
    let right = this.height(node.right);
    return Math.max(left, right) + 1;
  }

}

const demo = () => {
  let tree = new AVLTree();
  tree.insert(tree.root, 30);
  tree.insert(tree.root, 20);
  tree.insert(tree.root, 10);
  console.log(JSON.stringify(tree.root));
}

demo();