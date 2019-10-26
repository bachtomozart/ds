'use strict'

class LinearSearch {
  search(items, input) {
    for(let i =0;i<items.length;i++) {
        if(items[i] === input) return i;
    }
    return -1;
  }
}

const demo = () => {
  let ls = new LinearSearch();
  console.log(ls.search([10, 20, 30, 40, 50, 60, 70, 80, 90], 50));
  console.log(ls.search([10, 20, 30, 40, 50, 60, 70, 80, 90], 200));
}

demo();