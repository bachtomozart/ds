'use strict'

class CountCharacters {

  constructor() {
    this.alphanumeric = new RegExp('^[a-z0-9]+$','i');
  }

  getCharacterCount(string) {
    let result = this.findCharacterCount(string);
    console.log(`The character counts in ${string} is ${JSON.stringify(result)}`);
  }

  findCharacterCount(string) {
    let result = new Object();
    for(let i=0;i<string.length;i++) {
      let char = string[i];
      if(!this.alphanumeric.test(char)) 
        continue;
      if(result[char.toLowerCase()]) {
        result[char.toLowerCase()] = result[char.toLowerCase()] + 1;
      } else  {
        result[char.toLowerCase()] = 1;
      }
    }
    return result;
  }

}

const demo = () => {
  let cc = new CountCharacters();
  cc.getCharacterCount('Govindarajan Panneerselvam');
}

demo();