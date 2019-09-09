'use strict';

const getList = (name, message, choices) => {
  return {
    type: 'list',
    name: name,
    message: message,
    choices: choices
  }
},
getInput = (name, message) => {
  return {
    type: 'input',
    name: name,
    message: message
  }
},
getQuantity = (name, item) => getInput(name, 'How many of ' + item + ' would you like?');

export { getList, getInput, getQuantity };