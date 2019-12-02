'use strict'

/**
 * 
 * @param {Number} n 
 * @param {Number} k 
 * c(n,k) = c(n-1,k-1) + c(n-1,k);
 * c(n,0) = c(n,n) = 1;
 */
let recursiveCount = 0;
let tdCount = 0;
let getNChooseK = (n, k) => {

  let result = nChooseK(n, k);
  console.log(`${n}, ${k} -> ${recursiveCount} - ${result}`);

  let dp = Array.from({
    length: n + 1
  }, () => Array(k + 1).fill(0));
  let tdResult = nChooseKTD(n, k, dp);
  console.log(`${n}, ${k} -> ${tdCount} - ${tdResult}`);

  return result;
};


let nChooseK = (n, k) => {
  recursiveCount++;
  if (k === 0 || k === n) return 1;
  let first = nChooseK(n - 1, k - 1);
  let second = nChooseK(n - 1, k);
  return first + second;
};

let nChooseKTD = (n, k, dp) => {
  if (k === 0 || k === n) return 1;
  if (dp[n][k] !== 0) return dp[n][k];
  tdCount++;
  let first = nChooseKTD(n - 1, k - 1, dp);
  let second = nChooseKTD(n - 1, k, dp);
  dp[n][k] = first + second;
  return dp[n][k];
};

getNChooseK(10, 3);