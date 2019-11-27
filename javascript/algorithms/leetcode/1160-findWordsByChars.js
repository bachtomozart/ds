/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  let result = 0;
  let map = new Map();
  for (let c of chars) {
    if (map.has(c)) map.set(c, map.get(c) + 1);
    else map.set(c, 1);
  }
  for (let word of words) {
    let wordMap = new Map([...map]);
    let i = 0;
    for (; i < word.length; i++) {
      if (!wordMap.has(word[i])) break;
      if (wordMap.get(word[i]) > 1) wordMap.set(word[i], wordMap.get(word[i]) - 1);
      else wordMap.delete(word[i]);
    }
    if(i === word.length) result += word.length;
  }
  return result;
};

countCharacters(["cat", "bt", "hat", "tree"], "atach")



