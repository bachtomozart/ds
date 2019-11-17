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

  traverse(type) {
    let output = [];
    this[type.toLowerCase() + 'Traversal']((node) => output.push(node.value), this.root);
    console.log(`${type.toLowerCase()} -> ${output.join(' -> ')}`);
  }

  bfsTraversal(cb, node = this.root) {
    if(!node) 
      return undefined;
    let queue = [node];
    while(queue.length > 0) {
      let current = queue.shift();
      cb(current);
      if(current.left) queue.push(current.left);
      if(current.right) queue.push(current.right);
    }
  }

  // LNR
  inorderTraversal(cb, node = this.root) {
    if(!node) return;
    this.inorderTraversal(cb, node.left);
    cb(node);
    this.inorderTraversal(cb, node.right);
  }

  // RNL
  outorderTraversal(cb, node = this.root) {
    if(!node) return;
    this.inorderTraversal(cb, node.right);
    cb(node);
    this.inorderTraversal(cb, node.left);
  }

  // NLR
  preorderTraversal(cb, node = this.root) {
    if(!node) return;
    cb(node);
    this.inorderTraversal(cb, node.left);
    this.inorderTraversal(cb, node.right);
  }

  // LRN
  postorderTraversal(cb, node = this.root) {
    if(!node) return;
    this.inorderTraversal(cb, node.left);
    this.inorderTraversal(cb, node.right);
    cb(node);
  }

  // RLN
  oustorderTraversal(cb, node = this.root) {
    if(!node) return;
    this.inorderTraversal(cb, node.right);
    this.inorderTraversal(cb, node.left);
    cb(node);
  }

}

const replacer = (key, value) => {
  // Filtering out properties
  if (value === null) {
    return undefined;
  }
  return value;
}

const demo = () => {
  let tree = new AVL();
  tree.insert(30);
  tree.insert(20);
  tree.insert(10);
  console.log(JSON.stringify(tree.root, replacer));
  tree.destroy();
  tree.insert(30);
  tree.insert(20);
  tree.insert(25);
  console.log(JSON.stringify(tree.root, replacer));
  tree.destroy();
  tree.insert(30);
  tree.insert(40);
  tree.insert(50);
  console.log(JSON.stringify(tree.root, replacer));
  tree.destroy();
  tree.insert(30);
  tree.insert(40);
  tree.insert(35);
  console.log(JSON.stringify(tree.root, replacer));
  tree.destroy();
  tree.insert(30);
  tree.insert(20);
  tree.insert(10);
  tree.insert(15);
  console.log(JSON.stringify(tree.root, replacer));
  tree.delete(30);
  console.log(JSON.stringify(tree.root, replacer));
  tree.destroy();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);
  tree.insert(6);
  tree.insert(7);
  tree.insert(8);
  tree.insert(9);
  console.log(JSON.stringify(tree.root, replacer));
  tree.traverse('bfs');
  tree.traverse('inorder');
  tree.traverse('outorder');
  tree.traverse('preorder');
  tree.traverse('postorder');
  tree.traverse('oustorder');
}

demo();