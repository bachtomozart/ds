'use strict'

class Reverse {
  constructor() {

  }

  getReverse(string) {
    let rev1 = this.reverse1(string);
    let rev2 = this.reverseRecursive1(string.split(''));
    let rev3 = this.reverseRecursive2(string.split(''));
    let rev4 = this.reverse2(string.split(''));
    console.log(`The reverse of ${string} is ${rev1}`);
    console.log(`The reverse of ${string} is ${rev2}`);
    console.log(`The reverse of ${string} is ${rev3}`);
    console.log(`The reverse of ${string} is ${rev4}`);
  }

  reverse1(string) {
    let output = '';
    for(let i = (string.length-1);i>=0;i--) {
      output += string[i];
    }
    return output;
  }

  reverse2(stringArray) {
    let i=0, j=stringArray.length-1;
    while(i <= j) {
      console.log(`i -> ${i}, j-> ${j}, stringArray[i] -> ${stringArray[i]}, stringArray[j] -> ${stringArray[j]}`);
      let temp = stringArray[i];
      stringArray[i] = stringArray[j];
      stringArray[j] = temp;
      i++;
      j--;
    }
    return stringArray.join('');
  }

  reverseRecursive1(stringArray) {
    console.log(JSON.stringify(stringArray));
    if(!stringArray.length) return '';
    return stringArray.splice(stringArray.length-1,1) + this.reverseRecursive1(stringArray);
  }

  reverseRecursive2(stringArray) {
    console.log(JSON.stringify(stringArray));
    if(!stringArray.length) return '';
    let character = stringArray.splice(0,1);
    return this.reverseRecursive2(stringArray) + character;
  }
}

const demo = () => {
  let rev = new Reverse();
  rev.getReverse('Govind');
}

demo();