'use strict'

class BinarySearch {
  constructor() {
    
  }

  search(items, itemToSearch) {
    // let result = this.searchItem(items, itemToSearch);
    let result = this.search2(items, itemToSearch);
    console.log(`${itemToSearch} -> ${result}`);
  }

  searchItem(items, itemToSearch) {
    let start = 0;
    let end = items.length-1;
    let mid = Math.floor((start+end)/2);
    while(items[mid] !== itemToSearch && start <= end) {
      mid = Math.floor((start+end)/2);
      if(itemToSearch < items[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return items[mid] === itemToSearch ? mid : -1;
  }

  search2(items, itemToSearch) {
    let start = 0;
    let end = items.length - 1;
    let middle = start + Math.floor((end-start)/2);
    while((end-start) > 1) {
      middle = start + Math.floor((end-start)/2);
      if(itemToSearch === items[middle]) {
        return middle;
      } else if (itemToSearch < items[middle]) {
        end = middle;
      } else {
        start = middle;
      }
    }
    if(itemToSearch === items[start]) return start;
    if(itemToSearch === items[end]) return end;
    return -1;
  }

}

const demo = () => {
  let bs = new BinarySearch();
  bs.search([1,2,3,4,5,6,7,8,9], 9);
  bs.search([1,2,3,4,5,6,7,8,9], 1);
  bs.search([1,2,3,4,5,6,7,8,9], 7);
  bs.search([1,2,3,4,5,6,7,8,9], 2);
  bs.search([1,2,3,4,5,6,7,8,9], 10);
}

demo();