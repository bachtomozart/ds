'use strict'

/**
 * Calculate coin change
 * @param {Number} amount 
 * @param {Array} coins 
 * @returns Number
 */
function calculateCoinChange(amount, coins) {
  let result = coinChange(amount, coins);
  console.log(`Result -> ${result}`);
}

let coinChange = (amount, coins) => {
  let result = [];
  let coinSet = new Set(coins);
  for (let i = coins.length - 1; i >= 0; --i) {
    let divisor = Math.floor(amount / coins[i]);
    let remainder = amount % coins[i];
    if(remainder === 0) {
      let newItems = Array(divisor).fill(coins[i]);
      result = [...result, ...newItems];
    } else if(coinSet.has(remainder)) {
      let newItems = Array(divisor).fill(coins[i]);
      if(newItems.length) {
        result = [...result, ...newItems];
        amount -= coins[i] * divisor;
      }
    }
  }
  return result.length === 0 ? -1 : result.length;
}

calculateCoinChange(11, [1, 2, 5]);