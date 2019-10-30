'use strict'

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class AVL {
  constructor() {
    this.root = null;
  }

  destroy() {
    this.root = null;
  }

  insert(value, node = this.root) {
    if (!this.root) {
      this.root = new Node(value);
      return this;
    }

    if (value < node.value) {
      if (node.left) {
        this.insert(value, node.left);
      } else {
        node.left = new Node(value);
      }
    } else {
      if (node.right) {
        this.insert(value, node.right);
      } else {
        node.right = new Node(value);
      }
    }

    this.balanceNode(node);
  }

  delete(value, node = this.root) {
    if (!node)
      return undefined;

    let parent = this.findParent(value, node);
    if(parent.left.value === value) {
      parent.left = null;
    } else {
      parent.right = null;
    }

    this.balanceNode(parent);
  }

  findParent(value, node = this.root) {
    if(!node) return null;
    if(node.left && node.left.value === value) return node;
    if(node.right && node.right.value === value) return node;
    if(value < node.value) return this.findParent(value, node.left);
    return this.findParent(value, node.right);
  }

  balanceNode(node) {
    let balance = this.getBalance(node);
    if (balance > 1) {
      let llBalance = this.getHeight(node.left.left);
      let lrBalance = this.getHeight(node.left.right);
      if(llBalance > lrBalance) {
        // LL Imbalance
        this.rightRotate(node);
      } else {
        // LR Imbalance
        this.leftRotate(node.left);
        this.rightRotate(node);
      }
    } else if (balance < -1) {
      let rlBalance = this.getHeight(node.right.left);
      let rrBalance = this.getHeight(node.right.right);
      if(rlBalance > rrBalance) {
        // RL Imbalance
        this.rightRotate(node.right);
        this.leftRotate(node);
      } else {
        // RR Imbalance
        this.leftRotate(node);
      }
    }
  }

  rightRotate(node) {
    let parent = this.findParent(node.value);
    let newParent = node.left;
    node.left = newParent.right;
    newParent.right = node;
    if(!parent) {
      this.root = newParent;
    } else if (newParent.value < parent.value) {
      parent.left = newParent;
    } else {
      parent.right = newParent;
    }
  }

  leftRotate(node) {
    let parent = this.findParent(node.value);
    let newParent = node.right;
    node.right = newParent.left;
    newParent.left = node;
    if(!parent) {
      this.root = newParent;
    } else if (newParent.value < parent.value) {
      parent.left = newParent;
    } else {
      parent.right = newParent;
    }
  }

  getBalance(node) {
    return this.getHeight(node.left) - this.getHeight(node.right)
  }

  getHeight(node) {
    if (!node) return -1;
    let left = this.getHeight(node.left);
    let right = this.getHeight(node.right);
    return 1 + Math.max(left, right);
  }
}

const demo = () => {
  let tree = new AVL();
  tree.insert(30);
  tree.insert(20);
  tree.insert(10);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(30);
  tree.insert(20);
  tree.insert(25);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(30);
  tree.insert(40);
  tree.insert(50);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(30);
  tree.insert(40);
  tree.insert(35);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(30);
  tree.insert(20);
  tree.insert(10);
  tree.insert(15);
  console.log(JSON.stringify(tree.root));
  tree.delete(30);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
}

demo();