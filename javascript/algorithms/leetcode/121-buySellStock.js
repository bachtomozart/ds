/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if(!prices || prices.length === 0)
      return 0;
  let low = Infinity, result = 0;
  for(let i = 0; i < prices.length; i++) {
      if(prices[i] < low) {
          low = prices[i];
      } else if (prices[i] - low > result) {
          result = prices[i] - low;
      }
  }
  return result;
};