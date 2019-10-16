'use strict'

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const convertToNumber = (node) => {
  let result = '';
  let current = node;
  while(current) {
      nodeVal = current.val.toString()
      result = nodeVal + result;
      current = current.next;
  }
  return result;
}

const convertToNumberReversed = (node) => {
  let result = '';
  let current = node;
  while(current) {
      nodeVal = current.val.toString()
      result = result + nodeVal;
      current = current.next;
  }
  return result;
}

const convertNumberToList = (number) => {
  let nums = number.toString().split('');
  let result = insertFirst(nums.splice(0,1), null);
  while(nums.length) {
      result = insertFirst(nums.splice(0,1), result);
  }
  return result;
}

const insertFirst = (number, child) => {
  let parent = new ListNode(Number(number[0]));
  parent.next = child;
  return parent;
}

const convertToNumbers = (l1, l2) => {
let n1 = convertToNumber(l1);
let n2 = convertToNumber(l2);
let trailingZeroes = Array(Math.abs(n2.length-n1.length)).fill(0).join('');
if(n1.length > n2.length) {
  n2 = n2 + trailingZeroes;
} else {
  n1 = n1 + trailingZeroes;
}
return new Array(Number(n1), Number(n2));
}

const sumNumbers = (n1, n2) => {
let result = '', carry = 0;
for(let i = 0; i < n1.length; i++) {
    let num1 = Number(n1[i]);
    let num2 = Number(n2[i]) || 0;
    let sum = num1 + num2;
    if(carry) {
      sum = sum + carry;
      carry = 0;
    }
    if(sum >= 10) {
      carry = 1;
      sum = sum - 10;
    }
    result = sum.toString() + result;
}
if(carry > 0) result = carry.toString() + result;
return result;
}

var addTwoNumbers = function(l1, l2) {
let n1 = convertToNumberReversed(l1);
let n2 = convertToNumberReversed(l2);
let sum = 0;
if(n2.length > n1.length) {
    sum = sumNumbers(n2, n1);
} else {
    sum = sumNumbers(n1, n2);
}
let result = convertNumberToList(sum);
return result;
};

console.log(`${JSON.stringify(addTwoNumbers(convertNumberToList(342), convertNumberToList(465)))}`);
console.log(`${JSON.stringify(addTwoNumbers(convertNumberToList(5), convertNumberToList(5)))}`);
console.log(`${JSON.stringify(addTwoNumbers(convertNumberToList(9), convertNumberToList(9)))}`);