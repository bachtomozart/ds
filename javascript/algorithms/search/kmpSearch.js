'use strict'

class KMPSearch {
  constructor() {

  }

  search(input, pattern) {
    let result = this.kmpSearch(input, pattern);
    console.log(`${result}`);
  }

  kmpSearch(input, pattern) {
    let prefix = this.buildPrefixArray(pattern);
    let i = 0,
        j = 0;
    let positions = [];
    for (i = 0; i < input.length; i++) {
      if (input[i] === pattern[j]) {
        j++;
      } else {
        while (j > 0 && input[i] !== pattern[j]) {
          j = prefix[j - 1];
        }
        if (input[i] === pattern[j]) j++;
      }
      if(j===pattern.length) positions.push(i-j+1)
      if(j===pattern.length) j=0;
    }
    return positions
  }

  getPrefixArray(pattern) {
    let result = this.buildPrefixArray(pattern);
    console.log(`The prefix array for ${pattern} is ${JSON.stringify(result)}`);
  }

  buildPrefixArray(pattern) {
    let prefixArray = [0];
    for (let i = 1, j = 0; i < pattern.length; i++) {
      if (pattern[i] === pattern[j]) {
        prefixArray[i] = j + 1;
        j++;
      } else {
        while (j > 0 && pattern[i] !== pattern[j]) {
          j = prefixArray[j - 1]
        }
        if (pattern[i] === pattern[j]) prefixArray[i] = j + 1;
        else prefixArray[i] = j;
      }
    }
    return prefixArray;
  }

}

const demo = () => {
  let kmp = new KMPSearch();
  // kmp.getPrefixArray('abcaby');
  // kmp.getPrefixArray('abcdabc');
  // kmp.getPrefixArray('abcdabeabf');
  // kmp.getPrefixArray('abcdeabfabc');
  // kmp.getPrefixArray('aabcadaabe');
  // kmp.getPrefixArray('aaaabaacd');
  // kmp.getPrefixArray('acacabacacabacacac');
  kmp.search('abxabcabcabyabcabcaby', 'abcaby');
  // kmp.search('abcdgabbaccbbabcdeabcdabc', 'abcdabc')
  // kmp.search('abcdgabbaccbbabcdeabcdabc', 'aabcadaabe')
}

demo();