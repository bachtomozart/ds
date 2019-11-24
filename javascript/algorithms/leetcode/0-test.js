// /**
//  * @param {number} N
//  * @return {number}
//  */
// var rotatedDigits = function(N) {
//   let counter = 0;
//   for(let i=0;i<=N;i++) {
//       let digits = i.toString().split('');
//       let set = new Set();
//       for(let digit of digits){
//         set.add(Number(digit));
//       }
//       if(set.has(3) || set.has(4) || set.has(7)) {
//         continue;
//       }
//       if(set.has(2) || set.has(5) || set.has(6) || set.has(9)) {
//         counter++;
//       }
//   }
//   return counter;
// };


