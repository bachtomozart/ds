'use strict'

/**
 * Calculate coin change
 * @param {Number} amount 
 * @param {Array} coins 
 */
function calculateCoinChange(amount, coins) {
  let result = coinChange(amount, coins);
  console.log(`${result}`);
}

let coinChange = (amount, coins) => {
  let result = Array(amount + 1).fill(0);
  result[0] = 1;
  for (let coin of coins) {
    for (let i = coin; i < amount + 1; ++i) {
      result[i] += result[i - coin];
    }
  }
  return result[amount];
}

calculateCoinChange(5, [1, 2, 5]);