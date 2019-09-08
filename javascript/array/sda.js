const readline = require('readline-sync');

class SDA {

  constructor() {
    this.array = undefined;
    this.initialized = false;
  }

  greeting() {
    console.log(
      `Your options
      1. initialize array
      2. insert item into array
      3. print item in array
      4. print all items in array
      5. update item in array
      6. delete item in array
      7. destroy array
      8. recreate array
      9. exit`
     );
  }

  perform(op) {
    let status = true, sizeOfArray, location, item;
    switch(op) {
      case 1:
        sizeOfArray = this.getInput('INITIALIZE', 'sizeOfArray');
        this.initialize('INITIALIZE', sizeOfArray);
        break;
      case 2:
        location = this.getInput('INSERT', 'location');
        item = this.getInput('INSERT', 'item');
        this.insert(location, item);
        break;
      case 3:
        location = this.getInput('PRINT', 'location');
        this.print('PRINT', location);
        break;
      case 4:
        this.printAll('PRINT ALL');
        break;
      case 5:
        location = this.getInput('UPDATE', 'location');
        item = this.getInput('UPDATE', 'item');
        this.update(location, item);
        break;
      case 6:
        location = this.getInput('DELETE', 'location');
        this.delete(location);
        break;
      case 7:
        this.destroy();
        break;
      case 8:
        sizeOfArray = this.getInput('RECREATE', 'sizeOfArray');
        this.recreate(sizeOfArray);
        break;
      case 9:
        console.log('See ya around!');
        status = false;
        break;
      default:
        console.log('Choose a valid option');
    }
    console.log(" ================= ");
    return status;
  }

  initialize(prefix, sizeOfArray) {
    this.array = [];
    this.fill(sizeOfArray);
    this.initialized = true;
    this.printAll(prefix);
  }

  insert(location, item) {
    if (this.initialized) {
      if(!this.array[location]) {
        this.print('INSERT - Before - ', location);
        this.array[location] = item;
        this.print('INSERT - After - ', location);
      } else {
        this.print('INSERT - NotEmpty - ', location);
      }
      this.printAll('INSERT');
    } else {
      this.warnEmptyArray('INSERT');
    }
  }

  print(prefix, location) {
    if (this.initialized) {
      console.log(prefix + ' - array['+location+'] = ' + this.array[location]);
    } else {
      this.warnEmptyArray(prefix);
    }
  }

  printAll(prefix) {
    if (this.initialized) {
      console.log(prefix + ' - array[' + this.array.length + '] = [' + this.array.join(',') + ']');
    } else {
      this.warnEmptyArray(prefix);
    }
  }

  update(location, item) {
    if (this.initialized) {
      this.print('UPDATE - Before - ', location);
      this.array[location] = item;
      this.print('UPDATE - After - ', location);
      this.printAll('UPDATE');
    } else {
      this.warnEmptyArray('UPDATE');
    }
  }

  delete(location) {
    if (this.initialized) {
      this.print('DELETE - Before - ', location);
      this.array[location] = undefined;
      this.print('DELETE - After - ', location);
      this.printAll('DELETE');
    } else {
      this.warnEmptyArray('DELETE');
    }
  }

  destroy() {
    this.array = undefined;
    this.initialized = false;
  }

  recreate(sizeOfArray) {
    this.destroy();
    this.initialize('RECREATE', sizeOfArray);
  }

  fill(sizeOfArray) {
    for(let i=0;i<sizeOfArray;i++) {
      this.array.push(i);
    }
  }

  getInput(prefix, context) {
    return readline.questionInt(prefix ? prefix + ' - Please enter the ' + context + ':' : 'Please enter the ' + context + ':'); 
  }

  warnEmptyArray(prefix) {
    console.log(prefix + " - The array is empty, please initialize");
  }
}

let status = true,
array = new SDA();
while(status) {
  array.greeting();
  let op = array.getInput('', 'option');
  status = array.perform(op);
}