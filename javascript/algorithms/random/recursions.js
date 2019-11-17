// 1. My Solutions
function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}

function factorial(num) {
  if (num <= 1) return 1;
  return num * factorial(num - 1);
}


// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60

function productOfArray(arr) {
  if (arr.length === 0) return 1;
  return arr.splice(0, 1) * productOfArray(arr);
}

// SAMPLE INPUT/OUTPUT
// recursiveRange(6) // 21
<<<<<<< HEAD
// recursiveRange(10) // 55
=======
// recursiveRange(10) // 55 
>>>>>>> ff012383f5f2a5a37862efa005633f58a47da31c

function recursiveRange(num) {
  if (num === 1) return 1;
  return num + recursiveRange(num - 1);
}

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465

function fib(num) {
<<<<<<< HEAD
  // add whatever parameters you deem necessary - good luck!
=======
  // add whatever parameters you deem necessary - good luck!  
>>>>>>> ff012383f5f2a5a37862efa005633f58a47da31c
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

<<<<<<< HEAD
// 1.Others Solution
=======
// 1.Others Solution 
>>>>>>> ff012383f5f2a5a37862efa005633f58a47da31c

function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}

function factorial(x) {
  if (x < 0) return 0;
  if (x <= 1) return 1;
  return x * factorial(x - 1);
}

function productOfArray(arr) {
  if (arr.length === 0) {
    return 1;
  }
  return arr[0] * productOfArray(arr.slice(1));
}

function recursiveRange(x) {
  if (x === 0) return 0;
  return x + recursiveRange(x - 1);
}

function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// 2.My Solutions

function reverse(input) {
  // add whatever parameters you deem necessary - good luck!
  if (!input) return '';
  return reverse(input.split('').slice(1, input.length).join('')) + input[0];
}

// reverse('awesome') // 'emosewa'
// reverse('rithmschool') // 'loohcsmhtir'

// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

function isPalindrome(input, start = 0, end = (input.length - 1)) {
  // add whatever parameters you deem necessary - good luck!
  if (start > end) return true;
  return input[start] === input[end] && isPalindrome(input, start + 1, end - 1);
}

// SAMPLE INPUT / OUTPUT
// const isOdd = val => val % 2 !== 0;

// someRecursive([1,2,3,4], isOdd) // true
// someRecursive([4,6,8,9], isOdd) // true
// someRecursive([4,6,8], isOdd) // false
// someRecursive([4,6,8], val => val > 10); // false

function someRecursive(inputs, cb) {
  // add whatever parameters you deem necessary - good luck!
  if (inputs.length === 1) return cb(inputs[0]);
  return cb(inputs.splice(0, 1)) || someRecursive(inputs, cb);
}

function flatten(input) {
  if (!input.length) return [];
  let one = [],
    two = [];
  if (Array.isArray(input[0])) {
    let mor = input.splice(0, 1);
    one = flatten(...mor);
  } else {
    one = input.splice(0, 1);
  }
  two = flatten(input);
  return [...one, ...two];
}

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3

// 2.Others Solution


function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}


function isPalindrome(str) {
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1))
  return false;
}


function someRecursive(array, callback) {
  if (array.length === 0) return false;
  if (callback(array[0])) return true;
  return someRecursive(array.slice(1), callback);
}


function flatten(oldArr) {
  var newArr = []
  for (var i = 0; i < oldArr.length; i++) {
    if (Array.isArray(oldArr[i])) {
      newArr = newArr.concat(flatten(oldArr[i]))
    } else {
      newArr.push(oldArr[i])
    }
  }
  return newArr;
}

// 3. My Solution

function capitalizeFirst(inputs) {
  // add whatever parameters you deem necessary - good luck!
  if (!inputs.length) return [];
  let word = [...inputs[0]];
  word[0] = word[0].toUpperCase();
  let current = [word.join('')];
  let rest = capitalizeFirst(inputs.slice(1, inputs.length));
  return [...current, ...rest]
}

// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']

function nestedEvenSum(input) {
  // add whatever parameters you deem necessary - good luck!
  let sum = 0;
  for (let prop in input) {
    if (typeof input[prop] === 'object') {
      sum += nestedEvenSum(input[prop]);
    } else if (typeof input[prop] === 'number' && (input[prop] % 2 === 0)) {
      sum += input[prop];
    }
  }
  return sum;
}


var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup"
    }
  }
}

var obj2 = {
  a: 2,
  b: {
    b: 2,
    bb: {
      b: 3,
      bb: {
        b: 2
      }
    }
  },
  c: {
    c: {
      c: 2
    },
    cc: 'ball',
    ccc: 5
  },
  d: 1,
  e: {
    e: {
      e: 2
    },
    ee: 'car'
  }
};

nestedEvenSum(obj1); // 6
nestedEvenSum(obj2); // 10

function capitalizeWords(inputs) {
  // add whatever parameters you deem necessary - good luck!
  if (!inputs.length) return [];
  let current = [inputs[0].toUpperCase()];
  let next = capitalizeWords(inputs.slice(1, inputs.length));
  return [...current, ...next];
}

// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']

function stringifyNumbers(input) {
  let output = {};
  for (let prop in input) {
    if (Array.isArray(input[prop])) {
      output[prop] = input[prop];
    } else if (typeof input[prop] === 'object') {
      output[prop] = stringifyNumbers(input[prop]);
    } else if (typeof input[prop] === 'number') {
      output[prop] = input[prop].toString();
    } else {
      output[prop] = input[prop];
    }
  }
  return output;
}

/*
let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}
/*

stringifyNumbers(obj)

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz"
          }
        }
      }
    }
  }
}

function collectStrings(input) {
  let output = [];
  for (let prop in input) {
    if (typeof input[prop] === 'object') {
      let result = collectStrings(input[prop]);
      output.push(...result);
    } else if (typeof input[prop] === 'string') {
      output.push(input[prop])
    }
  }
  return output;
}

let result = collectStrings(obj) // ["foo", "bar", "baz"])
console.log(JSON.stringify(result));

// 3. Other SOlution

function capitalizeWords(array) {
  if (array.length === 1) {
    return [array[0].toUpperCase()];
  }
  let res = capitalizeWords(array.slice(0, -1));
  res.push(array.slice(array.length - 1)[0].toUpperCase());
  return res;

}


function nestedEvenSum(obj, sum = 0) {
  for (var key in obj) {
    if (typeof obj[key] === 'object') {
      sum += nestedEvenSum(obj[key]);
    } else if (typeof obj[key] === 'number' && obj[key] % 2 === 0) {
      sum += obj[key];
    }
  }
  return sum;
}


function capitalizeFirst(array) {
  if (array.length === 1) {
    return [array[0][0].toUpperCase() + array[0].substr(1)];
  }
  const res = capitalizeFirst(array.slice(0, -1));
  const string = array.slice(array.length - 1)[0][0].toUpperCase() + array.slice(array.length - 1)[0].substr(1);
  res.push(string);
  return res;
}


function stringifyNumbers(obj) {
  var newObj = {};
  for (var key in obj) {
    if (typeof obj[key] === 'number') {
      newObj[key] = obj[key].toString();
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}


function collectStrings(obj) {
  var stringsArr = [];

  function gatherStrings(o) {
    for (var key in o) {
      if (typeof o[key] === 'string') {
        stringsArr.push(o[key]);
      } else if (typeof o[key] === 'object') {
        return gatherStrings(o[key]);
      }
    }
  }

  gatherStrings(obj);

  return stringsArr;
}


function collectStrings(obj) {
  var stringsArr = [];
  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      stringsArr.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      stringsArr = stringsArr.concat(collectStrings(obj[key]));
    }
  }

  return stringsArr;
}