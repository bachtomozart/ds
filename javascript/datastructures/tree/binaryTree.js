'use strict'

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class UnivalResult {
  constructor(count, status) {
    this.count = count;
    this.status = status;
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
      // console.log('parent -> ' + JSON.stringify(parent));
      if(parent.left) {
        parent.right = node;
      } else {
        parent.left = node;
      }
    } else {
      this.root = node;
    }
    // console.log('After add -> ' + JSON.stringify(this.root));
  }

  delete(data) {
    if (data === this.root.data) {
      const lastLeaf = this.getLastLeaf();
      if(lastLeaf.parent.left.data === lastLeaf.leaf.data) {
        lastLeaf.parent.left = null;
      } else {
        lastLeaf.parent.right = null;
      }
      this.root.data = lastLeaf.leaf.data;
    } else {
      let parent = this.findParent(this.root, data);
      // console.log('parent -> ' + JSON.stringify(parent));
      if(!parent) {
        console.log('The given node could not be found in the tree');
      } else if(parent.left.data === data) {
        parent.left = null;
        // console.log('After delete -> ' + JSON.stringify(this.root));
      } else {
        parent.right = null;
        // console.log('After delete -> ' + JSON.stringify(this.root));
      }
    }
  }

  destroy() {
    this.root = null;
  }

  depthOfTree() {
    let maxDepth = this.depthOfNode(this.root);
    console.log(`max depth of tree is ${maxDepth}`);
  }

  findUnivalsInTree() {
    let startNode = this.root;
    let numOfUnivals = this.unival(startNode);
    console.log(`The number of univals in the tree is ${numOfUnivals.count}`);
  }

  unival(node) {
    if(!node) return new UnivalResult(0, true);

    let left = this.unival(node.left);
    let right = this.unival(node.right);
    let currentStatus = true;

    if(!left.status || !right.status) {
      currentStatus = false;
    } else if (node.left && node.left.data !== node.data) {
      currentStatus = false;
    } else if (node.right && node.right.data !== node.data) {
      currentStatus = false;
    }

    if(currentStatus) {
      return new UnivalResult((1 + left.count + right.count), true);
    } else {
      return new UnivalResult(left.count + right.count, false);
    }

  }

  findLeastCommonAncestor(val1, val2) {
    let lcaVal = this.lca(this.root, val1, val2);
    console.log(`The LCA for ${val1} and ${val2} is ${lcaVal}`)
  }
 
  lca(node, val1, val2) {
    if(node) {
      if(node.data === val1 || node.data === val2) {
        return node.data;
      } else {
        let left = this.lca(node.left, val1, val2);
        let right = this.lca(node.right, val1, val2);
        if(left && !right) {
          return left;
        } else if(right && !left) {
          return right;
        } else if (left && right) {
          if((left === val1 || left === val2) && 
          (right === val1 || right === val2)) {
            return node.data;
          } else {
            console.log('WTF is happening');
            return node.data;
          }
        } else {
          return null;
        }
      }
    } else {
      return null;
    }
  }

  depthOfNode(node) {
    if(!node) return 0;
    let left = this.maxDepthOfNode(node.left)
    let right = this.maxDepthOfNode(node.right);
    return Math.max(left, right) + 1;
  }

  printTree(traversal, startNode) {
    let values = this.traverseTree(traversal, startNode).map((item) => item.data);
    console.log(traversal + 'Traversal' + ' -> ' + JSON.stringify(values));
  }

  getLastLeaf() {
    const startNode = this.root,
    traversal = 'levelorder',
    leaf = this.traverseTree(traversal, startNode).pop(),
    parent = this.findParent(startNode, leaf.data);
    return { leaf: leaf, parent: parent } ;
  }

  traverseTree(traversal, startNode) {
    if(!startNode) startNode = this.root;
    let values = [];
    this[traversal + 'Traversal'](startNode, (node) => { 
      values.push(node); 
    });
    return values;
  }

  //NLR
  preorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      cb(node);
      this.preorderTraversal(node.left, cb);
      this.preorderTraversal(node.right, cb);
    }
  }

  //LNR
  inorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.inorderTraversal(node.left, cb);
      cb(node);
      this.inorderTraversal(node.right, cb);
    }
  }

  //RNL
  outorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.outorderTraversal(node.right, cb);
      cb(node);
      this.outorderTraversal(node.left, cb);
    }
  }

  //LRN
  postorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      this.postorderTraversal(node.left, cb);
      this.postorderTraversal(node.right, cb);
      cb(node);
    }
  }

  //BFS
  levelorderTraversal(node, cb) {
    if(!node) {
      return null;
    } else {
      let queue = [node];
      while(queue.length > 0) {
        let childrenQueue = [];
        for(let node of queue) {
          if(node) {          
            cb(node);
            childrenQueue.push(node.left);
            childrenQueue.push(node.right);
          }
        }
        queue = childrenQueue;
      }
    }
  }

  findParent(node, data) {
    let queue = [node];
    // console.log('queue length -> ' + queue.length);
    // console.log(JSON.stringify(queue));
    while(queue.length > 0) {
      let childrenQueue = [];
      for(let node of queue) {
        if(node) {
          // console.log('findParent -> ' + JSON.stringify(node));
          if((node.left && node.left.data === data) ||
            (node.right && node.right.data === data)) {
            return node;
          } else {
            childrenQueue.push(node.left);
            childrenQueue.push(node.right);
          }
        }
      }
      queue = childrenQueue;
    }
  }

  findFirstEligibleParent(node) {
    let queue = [node];
    // console.log('queue length -> ' + queue.length);
    // console.log(JSON.stringify(queue));
    while(queue.length > 0) {
      let childrenQueue = [];
      for(let node of queue) {
        if(node) {
          if(!node.left || !node.right) {
            return node;
          } else {
            childrenQueue.push(node.left);
            childrenQueue.push(node.right);
          }
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
  tree.maxDepthOfTree();
  tree.insert(4);
  tree.insert(5);
  tree.insert(6);
  tree.insert(7);
  tree.insert(8);
  tree.maxDepthOfTree();
  tree.printTree('preorder');
  tree.printTree('inorder');
  tree.printTree('outorder');
  tree.printTree('postorder');
  tree.printTree('levelorder');
  tree.delete(7);
  console.log("Deleted => 7")
  tree.depthOfTree();
  tree.delete(8);
  console.log("Deleted => 8")
  tree.depthOfTree();
  tree.delete(1);
  console.log("Deleted => 1")
  tree.depthOfTree();
  tree.printTree('preorder');
  tree.printTree('inorder');
  tree.printTree('outorder');
  tree.printTree('postorder');
  tree.printTree('levelorder');
  tree.delete(10);
}

const demoUnival = () => {
  let tree = new BinaryTree();
  tree.insert(1);
  tree.insert(1);
  tree.insert(2);
  tree.insert(2);
  tree.insert(2);
  tree.insert(2);
  tree.insert(2);
  tree.findUnivalsInTree();
}

const demoLCA = () => {
  console.log('Demo LCA in Binary Tree');
  let tree = new BinaryTree();
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  tree.insert(4);
  tree.insert(5);
  tree.insert(6);
  tree.insert(7);
  tree.insert(8);
  tree.findLeastCommonAncestor(7, 8);
}

// export { BinaryTree, demoBinaryTree }

// demoBinaryTree();
// demoUnival();
demoLCA();