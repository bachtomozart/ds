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

  destroy() {
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
    this.balanceTree(node);
  }

  delete(node, data) {
    if(!node) return null;
    let parent = this.findParent(node, data);
    if(parent.left.data === data) {
      parent.left = null;
    } else {
      parent.right = null;
    }
    parent.balance = this.calculateBalance(parent);
    this.balanceTree(parent);
  }

  balanceTree(node) {
    if(node.balance > 1) {
      let llBalance = this.calculateBalance(node.left.left);
      let lrBalance = this.calculateBalance(node.left.right);
      if(llBalance > lrBalance) {
        // LL Rotation
        console.log(`Found LL Imbalance, Performing Right Rotate on ${node.data}`)
        this.rightRotate(node);
      } else {
        console.log(`Found LR Imbalance, Performing Left Rotate on ${node.left.data}`)
        console.log(`Found LR Imbalance, Performing Right Rotate on ${node.data}`)
        // LR Rotation
        this.leftRotate(node.left);
        this.rightRotate(node);
      }
    } else if (node.balance < -1) {
      let rrBalance = this.calculateBalance(node.right.right);
      let rlBalance = this.calculateBalance(node.right.left);
      if(rrBalance > rlBalance) {
        // RR Rotation
        console.log(`Found RR Imbalance, Performing Left Rotate on ${node.data}`)
        this.leftRotate(node);
      } else {
        console.log(`Found RL Imbalance, Performing Right Rotate on ${node.right.data}`)
        console.log(`Found RL Imbalance, Performing Left Rotate on ${node.data}`)
        // RL Rotation
        this.rightRotate(node.right);
        this.leftRotate(node);
      }
    }
  }

  rightRotate(node) {
    let parent = this.findParent(this.root, node.data);
    let newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    if (parent && parent.data > node.data) parent.left = newRoot;
    if (parent && parent.data < node.data) parent.right = newRoot;
    if(!parent) this.root = newRoot;
    newRoot.balance = this.calculateBalance(newRoot);
    node.balance = this.calculateBalance(node);
  }

  leftRotate(node) {
    let parent = this.findParent(this.root, node.data);
    let newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    if (parent && parent.data > node.data) parent.left = newRoot;
    if (parent && parent.data < node.data) parent.right = newRoot;
    if(!parent) this.root = newRoot;
    newRoot.balance = this.calculateBalance(newRoot);
    node.balance = this.calculateBalance(node);
  }

  findParent(node, data) {
    if(!node) return null
    if(node.left && node.left.data === data) return node;
    if(node.right && node.right.data === data) return node;
    if(data <= node.data) return this.findParent(node.left, data);
    return this.findParent(node.right, data);
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

const demoInsert = () => {
  let tree = new AVLTree();
  tree.insert(tree.root, 30);
  tree.insert(tree.root, 20);
  tree.insert(tree.root, 10);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(tree.root, 30);
  tree.insert(tree.root, 20);
  tree.insert(tree.root, 25);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(tree.root, 30);
  tree.insert(tree.root, 40);
  tree.insert(tree.root, 50);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
  tree.insert(tree.root, 30);
  tree.insert(tree.root, 40);
  tree.insert(tree.root, 35);
  console.log(JSON.stringify(tree.root));
  tree.destroy();
}

const demoDelete = () => {
  let tree = new AVLTree();
  tree.insert(tree.root, 30);
  tree.insert(tree.root, 20);
  tree.insert(tree.root, 10);
  tree.insert(tree.root, 15);
  console.log(JSON.stringify(tree.root));
  tree.delete(tree.root, 30);
  console.log(JSON.stringify(tree.root));
}

demoInsert();
demoDelete();