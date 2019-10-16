//let array = new Object();
//array[0] = new Object();
//array[0][0] = '00';
//array[0][1] = '01';
//array[1] = new Object();
//array[1][0] = '10';
//array[1][1] = '11';
//console.log(JSON.stringify(array));
//let test = array[0][2] || 0;
//console.log(JSON.stringify(test));
//
//let val = 'Hello';
//console.log(val.length);
//
//class ListNode {
//  constructor(val, next = null) {
//    this.val = val;
//    this.next = next;
//  }
//}
//let nums = '801'.split('');
//let result = new ListNode(nums.splice(0,1));
//console.log(JSON.stringify(result));
//console.log(JSON.stringify(nums));

let nums = [3,1,5,8];

let map = new Map([
  [-1,1],
  [nums.length+1, 1]
])

console.log(JSON.stringify([...map]));