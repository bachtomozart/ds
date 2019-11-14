function countPairsWithSum(k, a) {
  let result = 0;
  let map = new Map();
  for (let i = 0; i < a.length; i++) {
    if (map.has(a[i])) map.set(a[i], map.get(a[i]) + 1);
    else map.set(a[i], 1);
  }
  for (let [key, value] of map.entries()) {
    let balance = k - key;
    if (map.has(balance)) {
      if (key !== balance) {
        map.delete(key);
        map.delete(balance);
        result++;
      } else {
        if (map.get(key) > 1) {
          map.set(key, map.get(key) - 1);
          result++;
          map.delete(key);
        }
      }
    }
  }
  console.log(`${result}`);
  return result;
}

countPairsWithSum(12, [7, 15, 9, 10, 2, 1, 5, 2, 6, 11, 6]);