'use strict'

class Anagram {
  constructor() {

  }

  isAnagram(string1, string2) {
    let result1 = this.validAnagram1(string1, string2);
    let result2 = this.validAnagram2(string1, string2);
    console.log(`The given inputs ${string1} and ${string2} is ${result1 ? "an anagram" : "not an anagram"}`);
    console.log(`The given inputs ${string1} and ${string2} is ${result2 ? "an anagram" : "not an anagram"}`);
  }

  validAnagram1(string1, string2) {
    let map1 = new Map();
    let map2 = new Map();

    for(let char of string1) {
      map1.has(char) ? map1.set(char, map1.get(char) + 1) : map1.set(char, 1);
    }

    for(let char of string2) {
      map2.has(char) ? map2.set(char, map2.get(char) + 1) : map2.set(char, 1);
    }

    for(let [key,value] of map1.entries()) {
      if(!map2.has(key)) return false;
      if(map2.get(key) !== value) return false;
    }

    return true;
  }

  validAnagram2(string1, string2){
    let map1 = {};
    let map2 = {};
    for(let char of string1) {
        map1[char] = ++map1[char] || 1;
    }
    for(let char of string2) {
        map2[char] = ++map2[char] || 1;
    }
    let keys = Object.keys(map1);
    for(let key of keys) {
        if(!map2[key]) return false;
        if(map2[key] !== map1[key]) return false;
    }
    return true;
  }
}

const demo = () => {
  let a = new Anagram();
  a.isAnagram('cinema', 'iceman');
  a.isAnagram('aaaz','zzaa');
}

demo();