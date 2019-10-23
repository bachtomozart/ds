'use strict'

class SameFrequency {
  constructor() {
    this.map = new Map();
  }

  getSameFrequency(n1, n2) {
    let result = this.findSameFrequency(n1, n2);
    console.log(`The numbers ${n1} and ${n2} ${result ? 'have' : 'do not have'} the same frequency of digits`);
  }

  findSameFrequency(n1, n2) {
    let s1 = n1.toString();
    let s2 = n2.toString();
    for(let char of s1) {
      this.map.has(char) ? this.map.set(char, this.map.get(char) + 1) : this.map.set(char, 1);
    }
    for(let char of s2) {
      if(!this.map.has(char)) return false;
      if(this.map.get(char) > 1) {
        this.map.set(char, this.map.get(char) - 1);
      } else {
        this.map.delete(char);
      }
    }
    return this.map.size === 0;
  }

}

const demo = () => {
  let sf = new SameFrequency();
  sf.getSameFrequency(182,281);
  sf.getSameFrequency(34,14);
}

demo();