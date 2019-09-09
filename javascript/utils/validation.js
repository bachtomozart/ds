'use strict';

export const validateNumber = (value) => {
  let numberRegex = /^\d*$/gmi;
  if(value.match(numberRegex)) {
    return value;
  } else {
    return null;
  }
};