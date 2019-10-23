'use strict';

class CheckDuplicates {
  constructor() {

  }

  checkDuplicates(...args) {
    let result1 = this.areThereDuplicates1(args);
    let result2 = this.areThereDuplicates2(args);
    let result3 = this.areThereDuplicates3(args);
    console.log(`The results for ${JSON.stringify(args)} are result1 - ${result1}, result2 - ${result2}, result3 - ${result3}`);
  };

  areThereDuplicates1(inputs) {
    let hashSet = new Set();
    for(let char of inputs) {
        if(hashSet.has(char)) {
            return true;
        } else {
            hashSet.add(char);
        }
    }
    return false;
  }

  areThereDuplicates2(inputs) {
    let i = 0, j = 1;
    inputs.sort((a,b) => a > b);
    while(j < inputs.length) {
      if(inputs[i] === inputs[j]) {
        return true;
      } else {
        i++;
        j++;
      }
    }
    return false;
  }

  areThereDuplicates3(inputs) {
    return new Set(inputs).size !== inputs.length;
  }
}

const demo = () => {
  let cd = new CheckDuplicates();
  cd.checkDuplicates(1,2,3);
  cd.checkDuplicates(1,2,2);
  cd.checkDuplicates('a','b','c','a');
}

demo();
