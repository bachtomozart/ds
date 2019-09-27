'use strict'

class Node {
  constructor(data, next, endOfWord = false) {
    this.map = new Map();
    if(data) {
      if(next) {
        this.map.set(data, next);
      } else {
        this.map.set(data, null);
      }
    }
    this.endOfWord = endOfWord;
  }

  get(data) {
    return this.map.get(data);
  }

  add(data, next = null) {
    this.map.set(data, next);
  }

  has(data) {
    return this.map.has(data);
  }

  delete(data) {
    this.map.delete(data);
  }

  setIsEnd() {
    this.endOfWord = true;
  }

  setIsNotEnd() {
    this.endOfWord = false;
  }

  isEnd() {
    return this.endOfWord;
  }

  isNotEmpty() {
    return this.map.size > 0;
  }
}

class Trie {
  constructor() {
    this.root = null;
  }

  addWord(word) {
    if(!this.root) {
      this.root = this.buildTrie(word.split(''));
    } else {
      this.checkAndBuildTrie(this.root, word.split(''));
    }
  }

  buildTrie(wordArray) {
    return wordArray[0] ? new Node(wordArray.shift(), this.buildTrie(wordArray)) : new Node(null, null, true);
  }

  checkAndBuildTrie(currNode, wordArray) {
    if(!wordArray[0]) {
      if(currNode.isNotEmpty()) {
        currNode.setIsEnd();
        return currNode;
      } else {
        return new Node(null, null, true);
      }
    } else {
      if(currNode.has(wordArray[0])) {
        let prev = wordArray.shift()
        return this.checkAndBuildTrie(currNode.get(prev), wordArray);
      } else {
        currNode.add(wordArray.shift(), this.buildTrie(wordArray))
        return currNode;
      }
    }
  }

  searchTrie(currNode, wordArray) {
    if(!currNode) return null;
    if(wordArray[0]) {
      let currChar = wordArray.shift();
      if(currNode.has(currChar)) {
        return this.searchTrie(currNode.get(currChar), wordArray);
      } else {
        return null;
      }
    } else {
      if(currNode.isNotEmpty()) {
        return this.printTrie(currNode);
      } else {
        return null;
      }
    }
  }

  printTrie(currNode) {
    if(!currNode) return [null];
    let result = [];
    if(currNode.isEnd()) result.push('');
    if(!currNode.isNotEmpty()) return result;
    for(let [key,value] of currNode.map.entries()) {
      let values = this.printTrie(value);
      let transformedValues = values.map((item) => key + item);
      result.push(...transformedValues);
    }
    return result;
  }

  printAll() {
    let all = this.printTrie(this.root);
    console.log('all words - ' + JSON.stringify(all));
  }

  findPossibilities(word) {
    let possibilities = this.searchTrie(this.root, word.split(''));
    console.log('possibilities for \'' + word + '\' - ' + JSON.stringify(possibilities));
  }

  deleteTrie(currNode, wordArray) {
    if(!currNode) return null;
    if(!wordArray[0]) return null;
    let currChar = wordArray.shift();
    if(currNode.has(currChar)) {
      if(wordArray[0]) {
        let deleteCurr = this.deleteTrie(currNode.get(currChar), wordArray);
        if(deleteCurr) {
          currNode.delete(currChar);
          if(currNode.isNotEmpty()) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        let next = currNode.get(currChar);
        if(next.isNotEmpty()) {
          if(currNode.isEnd()) currNode.setIsNotEnd() 
          return false;
        } else {
          currNode.delete(currChar);
          return true;
        }
      }
    } else {
      return false;
    }
  }

  deleteWord(word) {
    console.log(`Deleting ${word} - `);
    this.deleteTrie(this.root, word.split(''));
  }

}

const demoTrie = () => {
  let trie = new Trie();
  trie.addWord('air');
  trie.addWord('aisle');
  trie.addWord('aide');
  trie.addWord('aid');
  trie.addWord('aides');
  trie.addWord('ailment');
  trie.addWord('ailing');
  trie.printAll();
  trie.findPossibilities('ai');
  trie.findPossibilities('aid');
  trie.findPossibilities('aero');
  trie.deleteWord('aisle');
  trie.deleteWord('aid');
  trie.printAll();
}

demoTrie();