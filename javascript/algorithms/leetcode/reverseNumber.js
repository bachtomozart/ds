/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let xStr = x.toString().split('');
  let sign = '';
  if (xStr[0] === '-' || xStr[0] === '+') {
    sign = xStr.shift()
  }
  let reversed = sign + xStr.reverse().join('');
  let result = Number(reversed);
  if (result >= 2147483647 || result <= -2147483648) {
    return 0;
  } else {
    return result;
  }
};

reverse(-123);