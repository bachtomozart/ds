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
}

class Trie {
  constructor() {
    this.root = null;
  }

  addWord(word) {
    if(!this.root) {
      this.root = this.buildTrie(word.split(''));
    } else {
      this.checkAndBuildTrie(this.root, word);
    }
    console.log(JSON.stringify(this.root));
  }

  buildEntireTrie(word) {
    let wordArray = word.split(''), 
      prev = new Node(wordArray.shift()), 
      root = prev, 
      curr = prev,
      status = true;
    while(status) {
      let diff = word.length - wordArray.length,
        prev = word.substr(diff-1, 1);
      if(wordArray[0]) {
        curr = new Node(wordArray.shift());
      } else {
        curr = new Node(null, null, true);
        status = false;
      }
      prev.map.set(prev, curr);
      prev = curr;
    }
    return root;
  }

  buildTrie(wordArray) {
    return wordArray[0] ? new Node(wordArray.shift(), this.buildTrie(wordArray)) : new Node(null, null, true);
  }

  checkAndBuild(currNode, wordArray) {
    if(wordArray[0]) {
      if(currNode.has(wordArray[0])) {
        let prev = wordArray.shift()
        return this.checkAndBuild(currNode.get(prev), wordArray);
      } else {
        currNode.add(wordArray.shift(), this.buildTrie(wordArray))
        return currNode;
      }
    } else {
      return new Node(null, null, true);
    }
  }

}

const demoTrie = () => {
  let trie = new Trie();
  trie.addWord('air');
}

demoTrie();