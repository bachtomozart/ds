

function sumWithProduct(n) {
  let s = n.toString().split('');
  let sum = 0,
    product = 1;
  for (let i = 0; i < s.length; i++) {
    sum += Number(s[i]);
    product *= Number(s[i]);
  }
  let result = product - sum;
  console.log(`${result}`);
  return result;
}

sumWithProduct(123456)