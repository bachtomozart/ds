'use strict'

class Activity {
  constructor(action, start, finish) {
    this.action = action;
    this.start = start;
    this.finish = finish;
  }

  toString() {
    return '[' + item.action + '|' + item.start + ',' + item.finish + ']';
  }
}

class ActivitySelection {
  constructor(size) {
    this.activities = new Array(size);
    this.selection = new Array(size);
  }

  insert(action, start, finish) {
    this.activities.push(new Activity(action, start, finish));
  }

  findSelection() {
    this.activities.sort((a, b) => a.finish - b.finish);
    let previousActivity = new Activity('Dummy', -2, -1);
    for(let activity of this.activities) {
      if(previousActivity && previousActivity.finish < activity.start) {
        this.selection.push(activity);
        previousActivity = activity;
      }
    }
  }

  printSelection() {
    console.log(`Activity Selection -> ${this.selection.reduce((acc,item) => acc + "\t" + item.toString())}`)
  }
}

const demo = () => {
  let as = new ActivitySelection(6)
  as.insert('A1', 0, 6);
  as.insert('A2', 3, 4);
  as.insert('A3', 1, 2);
  as.insert('A4', 5, 8);
  as.insert('A5', 5, 7);
  as.insert('A6', 8, 9);
  as.findSelection();
  as.printSelection();
};

demo();