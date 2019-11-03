'use strict'

function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

var mergeTrees = function (t1, t2) {
  if(!t1 && !t2) return t1;
  if(!t1) t1 = new TreeNode(0);
  t1.val += t2 && t2.val || 0;
  t1.val += t2.val;
  mergeTree(t1, t2);
  return t1;
};

let mergeTree = (t1, t2) => {
  if (!t1 || !t2) return;
  if (!t1.left && t2.left) t1.left = new TreeNode(0);
  if (t1.left) t1.left.val += t2 && t2.left && t2.left.val || 0;
  if (!t1.right && t2.right) t1.right = new TreeNode(0);
  if (t1.right) t1.right.val += t2 && t2.right && t2.right.val || 0;
  mergeTree(t1.left, t2.left);
  mergeTree(t1.right, t2.right);
}

let tree1 = new TreeNode(1, new TreeNode(3, new TreeNode(5)), new TreeNode(2));
let tree2 = new TreeNode(2, new TreeNode(1, null, new TreeNode(4)), new TreeNode(3, null, new TreeNode(7)));

mergeTrees(tree1, tree2);