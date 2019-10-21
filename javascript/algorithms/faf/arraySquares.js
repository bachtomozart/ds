'use strict'

class ArraySquares {
  constructor() {

  }

  getSame(array1, array2) {
    let result1 = this.findSame1(array1, array2);
    let result2 = this.findSame2(array1, array2);
    console.log(`The given two array ${JSON.stringify(array1)} and ${JSON.stringify(array2)} are ${result1 ? "same" : "not same"}`);
    console.log(`The given two array ${JSON.stringify(array1)} and ${JSON.stringify(array2)} are ${result2 ? "same" : "not same"}`);
  }

  findSame1(array1, array2) {
    let squares = new Object();
    for(let item of array1) {
      let square = Math.pow(item,2);
      squares[square] = ++squares[square] || 1;
    }
    for(let compare of array2) {
      if(squares[compare]) {
        if(squares[compare] > 1) {
          --squares[compare];
        } else {
          delete squares[compare];
        }
      } else {
        return false;
      }
    }
    return Object.entries(squares).length === 0;
  }

  findSame2(array1, array2) {
    let map1 = new Map();
    let map2 = new Map();

    for(let item1 of array1) {
      map1.has(item1) ? map1.set(item1, map1.get(item1) + 1) : map1.set(item1, 1);
    }

    for(let item2 of array2) {
      map2.has(item2) ? map2.set(item2, map2.get(item2) + 1) : map2.set(item2, 1);
    }

    for(let [key, value] of map1.entries()) {
      let square = Math.pow(key,2);
      if(!map2.has(square)) return false;
      if(map2.get(square) !== value) return false; 
    }

    return true;
  }
}

const demo = () => {
  let as = new ArraySquares();
  as.getSame(new Array(1,2,3), new Array(4,1,9));
  as.getSame(new Array(1,2,1), new Array(1,4,4));
}

demo();
