/**
 * @param {number} num
 * @return {string}
 */

let initialize = () => {
  let map = new Map();
  map.set(1000000000, 'Billion');
  map.set(1000000, 'Million');
  map.set(1000, 'Thousand');
  map.set(100, 'Hundred');
  map.set(90, 'Ninety');
  map.set(80, 'Eighty');
  map.set(70, 'Seventy');
  map.set(60, 'Sixty');
  map.set(50, 'Fifty');
  map.set(40, 'Forty');
  map.set(30, 'Thirty');
  map.set(20, 'Twenty');
  map.set(19, 'Nineteen');
  map.set(18, 'Eighteen');
  map.set(17, 'Seventeen');
  map.set(16, 'Sixteen');
  map.set(15, 'Fifteen');
  map.set(14, 'Fourteen');
  map.set(13, 'Thirteen');
  map.set(12, 'Twelve');
  map.set(11, 'Eleven');
  map.set(10, 'Ten');
  map.set(9, 'Nine');
  map.set(8, 'Eight');
  map.set(7, 'Seven');
  map.set(6, 'Six');
  map.set(5, 'Five');
  map.set(4, 'Four');
  map.set(3, 'Three');
  map.set(2, 'Two');
  map.set(1, 'One');
  map.set(0, 'Zero');
  return map;
}

var numberToWords = function (num) {
  let numbers = initialize();
  if(num <= 10) return numbers.get(num);
  let result = [];
  for (let [key, value] of numbers.entries()) {
    let count = Math.floor(num / key);
    let total = count * key;
    let word = value;
    if (!count) continue;
    num -= total;
    if (numbers.has(count)) {
      if(count > 100) {
        word = numbers.get(count) + ' ' + word;
      } else {
        word = numberToWords(count) + ' ' + word;
      }
    } else {
      word = numberToWords(count) + ' ' + word;
    }
    result.push(word);
  }
  return result.join(' ');
};

let final = numberToWords(123);
console.log(`${final}`);