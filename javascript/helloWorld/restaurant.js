'use strict';

//TODO : Make this running forever with an exit condition

import * as inquirer from 'inquirer';
import { validateNumber } from '../utils/validation';
import { getList, getQuantity } from '../utils/prompt';

const menu = {
  main : getList('item', 'What would you like to have?', ['Idly', 'Dosa', 'Pongal', 'Vada']),
  idly : { prompt: getQuantity('quantity', 'idly'), price: 5.99 },
  dosa : {
    main: getList('subItem', 'Which dosa would you like?', ['Plain', 'Masala', 'Onion', 'Special']),
    plain : { prompt: getQuantity('quantity', 'plain dosa'), price: 7.99 },
    masala : { prompt: getQuantity('quantity', 'masala dosa'), price: 9.99 },
    onion : { prompt: getQuantity('quantity', 'onion dosa'), price: 9.99 },
    special : { prompt: getQuantity('quantity', 'special dosa'), price: 12.99 },
  },
  pongal : { prompt: getQuantity('quantity', 'pongal'), price: 8.99 },
  vada : {
    main : getList('subItem', 'Which vada would you like?', ['Plain', 'Sambar', 'Curd']),
    plain: { prompt: getQuantity('quantity', 'plain vada'), price: 3.99 },
    sambar: { prompt: getQuantity('quantity', 'sambar vada'), price: 4.99 },
    curd: { prompt: getQuantity('quantity', 'curd vada'), price: 4.99 }
  }
}

inquirer
.prompt([menu['main']])
.then((answer) => {
  console.log(answer);
  const item = answer.item.toString().toLowerCase();
  console.log(item);
  switch(item) {
    case 'idly': 
    case 'pongal':
      return Promise.all([
        Promise.resolve(item),
        Promise.resolve(false), 
        inquirer.prompt([menu[item]['prompt']])
      ]);
      break;
    case 'dosa':
    case 'vada':
      return Promise.all([
        Promise.resolve(item),
        Promise.resolve(true), 
        inquirer.prompt([menu[item]['main']])
      ]);
      break;
    default:
      return Promise.reject("Please order from the menu.");
  }
})
.then((answers) => {
  let item = answers[0], 
  moreOptions = answers[1], 
  answer = answers[2]
  if (moreOptions) {
    let subItem = answer['subItem'].toString().toLowerCase();
    return Promise.all([
      Promise.resolve(item),
      Promise.resolve(subItem),
      inquirer.prompt([menu[item][subItem]['prompt']])
    ]);
  } else {
    return Promise.all([
      Promise.resolve(item),
      Promise.resolve(false),
      Promise.resolve(answer)
    ]);
  }
})
.then((answers) => {
  let item = answers[0], 
  subItem = answers[1], 
  order = subItem ? subItem : item, 
  answer = answers[2], 
  quantity = validateNumber(answer.quantity),
  price = subItem ? menu[item][subItem]['price'] : menu[item]['price'];
  if (quantity) {
    return Promise.all([
      Promise.resolve(order),
      Promise.resolve(price),
      Promise.resolve(quantity)
    ]);
  } else {
    return Promise.reject("We're sorry but we couldn't serve you since you didn't order the quantity properly, Good bye!");
  }
})
.then((answers) => {
  let order = answers[0],
  price = Number(answers[1]),
  quantity = Number(answers[2]),
  cost = price * quantity,
  tax = cost * 0.10,
  total = cost + tax;
 console.log(
 `Your order
Item\t|\tQuantity\t|\tCost
${order.toUpperCase()}\t|\t${quantity}\t\t|\t$${price}
Total Price - ${cost}
Total Tax - ${tax}
Total Cost - ${total}`
 );
})
.catch((exception) => {
  console.log(exception);
});