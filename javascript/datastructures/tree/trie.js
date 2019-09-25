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

  getData(data) {
    this.map.get(data);
  }

  addData(data, next) {
    this.map.set(data, next);
  }

  removeData(data) {
    this.map.delete(data);
  }

  hasData(data) {
    return this.map.has(data);
  }
}

class Trie {
  constructor() {
    this.root = null;
  }

  addWord(word) {
    this.insert(this.root, word.split(''));
  }

  insert(node, wordArray) {
    if(!node) {
      if(!this.root) {
        this.root = new Node(wordArray[0]);
        this.insert(this.root, wordArray);
      }
    } else {
      // let diff = word.length - wordArray.length > 0 ? diff-1 : 0;
      // let previousChar = word.substr(diff, 1);
      let currentChar = JSON.parse(JSON.stringify(wordArray[0]));
      if (!currentChar) return new Node(null, null, true);
      if(node.map.has(currentChar) ) {
        wordArray.shift();
        if(!node.map.get(currentChar)) {
          node.map.set(currentChar, new Node(wordArray.shift()));
        }
        this.insert(node.map.get(currentChar), wordArray);
      } else {
        node.map.set(wordArray.shift(), null);
        this.insert(node.map.get(currentChar), wordArray);
      }
    }
  }

  insertV1(startNode, word, wordArray) {
    if(!startNode) {
      if(!this.root) {
        this.root = new Node(wordArray.shift());
        this.insert(startNode, word, wordArray);
      } else {
        return null;
      }
    } else {
      let diff = Number(word.length - wordArray.length);
      let previousChar = word.substr(diff-1, 1);
      let currentChar = wordArray[0];
      if(startNode.map.has(previousChar)) {
        if(previousChar === currentChar) wordArray.shift();
        this.insert(startNode.map.get(previousChar), word, wordArray);
      } else {
        startNode
      }
    }
  }
}

const demoTrie = () => {
  let trie = new Trie();
  trie.addWord('air');
}

demoTrie();