'use strict'

class StringConverter {
  constructor() {
    
  }

  findConversions(string1, string2, pos1=0, pos2=0) {
    // base conditions
    if(pos1 >= string1.length) {
      return string2.length - pos2;
    }
    if(pos2 >= string2.length) {
      return string1.length - pos1;
    }

    // recursive conditions
    if(string1[pos1] === string2[pos2]) {
      return this.findConversions(string1, string2, pos1+1, pos2+1);
    }
    let insertion = 1 + this.findConversions(string1, string2, pos1 + 1, pos2);
    let deletion = 1 + this.findConversions(string1, string2, pos1, pos2 + 1);
    let replacement = 1 + this.findConversions(string1, string2, pos1 + 1, pos2 + 1);
    // console.log(`${pos1} - ${pos2} -> ${insertion} - ${deletion} - ${replacement}`);
    return Math.min(insertion, deletion, replacement);
  }
}

const demo = () => {
  let sc = new StringConverter();
  let result = sc.findConversions('Triez a Table', 'Tgable');
  console.log(`The total conversions required are ${result}`);
}

demo();