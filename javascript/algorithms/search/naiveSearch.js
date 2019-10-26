'use strict'

class NaiveSearch {

  constructor() {

  }

  search(input, pattern) {
    let result = this.searchPattern(input, pattern);
    let count = this.searchCounts(input, pattern);
    let count2 = this.search2(input, pattern);
    console.log(`${pattern} -> ${result} with ${count} || ${count2}`);
  }

  searchPattern(input, pattern) {
    let found = false;
    let i = 0, j = 0;
    while(i < input.length) {
      if(input[i] === pattern[j]) {
        let k = i;
        while(j < pattern.length) {
          if(input[k] === pattern[j]) {
            j++;
            k++;
          } else {
            break;
          }
        }
        if(j === pattern.length) found = true;
      }
      if(found) break;
      else i++;
    }
    return found ? i : -1;
  }

  searchCounts(input, pattern) {
    let count = 0;
    let i=0, j=0;
    for(i = 0;i < input.length;i++) {
      j=0;
      if(input[i] === pattern[j]) {
        let k = i;
        while(j < pattern.length) {
          if(input[k] === pattern[j]) {
            j++;
            k++;
          } else {
            break;
          }
        }
        if(j === pattern.length) count++;
      }
    }
    return count;
  }

  search2(long, short) {
    let count = 0;
    for(let i = 0; i < long.length; i++) {
      for(let j = 0; j < short.length; j++) {
        if(short[j] !== long[i+j]) {
          break;
        }
        if(j === short.length - 1) count++;
      }
    }
    return count;
  }
}

const demo = () => {
  let ns = new NaiveSearch();
  ns.search('Hello World', 'ell');
  ns.search('Hello World', 'exl');
  ns.search('wowowomgzomgfobarbazomg', 'omg');
}

demo();