/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let result = 0;
  if (!prices || prices.length === 0) {
    return result;
  }
  for (let i = 0, j = 1; j <= prices.length; j++) {
    if (j === prices.length) {
      result += prices[j - 1] - prices[i];
      break;
    }
    if (j - i === 1 && prices[j] < prices[i]) {
      i = j;
    } else if (j - i !== 1 && prices[j] < prices[j - 1]) {
      result += prices[j - 1] - prices[i];
      i = j;
    }
  }
  return result;
};

// maxProfit([2, 4, 1]);
// maxProfit([7, 1, 5, 3, 6, 4]);
maxProfit([1, 2, 3, 4, 5]);
// maxProfit([2, 4, 1]);
// maxProfit([2, 4, 1]);