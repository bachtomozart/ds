/**
 * @param {number} num
 * @return {string}
 */
let initialize = () => {
  let map = new Map();
  map.set(1000, 'M');
  map.set(900, 'CM');
  map.set(500, 'D');
  map.set(400, 'CD');
  map.set(100, 'C');
  map.set(90, 'XC');
  map.set(50, 'L');
  map.set(40, 'XL');
  map.set(10, 'X');
  map.set(9, 'IX');
  map.set(5, 'V');
  map.set(4, 'IV');
  map.set(1, 'I');
  return map;
}
var intToRoman = function(num) {
  let symbols = initialize();
  let result = '';
  for(let [key, value] of symbols.entries()) {
      let count = Math.floor(num / key);
      let total = count * key;
      if(total === 4) {
          result += symbols.get(1);
          result += symbols.get(5);
          num -= 4;
      } else if (total === 9) {
          result += symbols.get(1);
          result += symbols.get(10);
          num -= 9;
      } else if (total === 40) {
          result += symbols.get(10);
          result += symbols.get(50);
          num -= 40;
      } else if (total === 90) {
          result += symbols.get(10);
          result += symbols.get(100);
          num -= 90;
      } else if (total === 400) {
          result += symbols.get(100);
          result += symbols.get(500);
          num -= 400;
      } else if (total === 900) {
          result += symbols.get(100);
          result += symbols.get(1000);
          num -= 900;
      } else  {
          result += Array(count).fill(value).join('');
          num -= total;
      }
  }
  console.log(`${num} -> ${result}`);
  return result;
};

intToRoman(4894);