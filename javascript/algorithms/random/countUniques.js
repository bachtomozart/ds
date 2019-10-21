'use strict'

class CountUnique {

  constructor() {

  }

  getUniques(input) {
    let result1 = this.findUniques1(input);
    let result2 = this.findUniques2(input);
    let result3 = this.findUniques3(input);
    console.log(`The number of unique values in ${JSON.stringify(input)} is ${result1}`);
    console.log(`The number of unique values in ${JSON.stringify(input)} is ${result2}`);
    console.log(`The number of unique values in ${JSON.stringify(input)} is ${result3}`);
  }

  findUniques1(input) {
    if(input.length <= 1) return input.length;
    let set = new Set();
    for (let item of input) {
      if(!set.has(item)) set.add(item);
    }
    return set.size;
  }

  findUniques2(input) {
    if(input.length <= 1) return input.length;
    let i=0,j=i+1, result = 0;
    while(i < input.length) {
      if(input[j] !== input[i]) {
        result++;
        i = j;
        j = i + 1;
      } else {
        j++;
      }
    }
    return result;
  }

  findUniques3(input){
    if(input.length <= 1) return input.length;
    let i=0, j=1;
    while(j < input.length) {
        if(input[i] !== input[j]) {
            i++;
            input[i] = input[j];
        }
        j++;
    }
    return i + 1;
  }

}

const demo = () => {
  let cu = new CountUnique();
  cu.getUniques(new Array(1,1,1,1,1,1,1,2));
  cu.getUniques(new Array(1,2,3,4,4,4,7,7,12,12,13));
  cu.getUniques([11]);
  cu.getUniques([]);
}

demo();