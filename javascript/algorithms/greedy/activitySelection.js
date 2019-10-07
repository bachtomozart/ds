'use strict'

class Activity {
  constructor(action, start, finish) {
    this.action = action;
    this.start = start;
    this.finish = finish;
  }

  toString() {
    return '[' + this.action + '|' + this.start + ',' + this.finish + ']';
  }
}

class ActivitySelection {
  constructor() {
    this.activities = new Array();
    this.selection = new Array();
  }

  insert(action, start, finish) {
    this.activities.push(new Activity(action, start, finish));
  }

  findSelection() {
    this.activities.sort((a, b) => a.finish - b.finish);
    let previousActivity = new Activity('Dummy', -2, -1);
    for(let activity of this.activities) {
      if(activity && previousActivity && previousActivity.finish < activity.start) {
        this.selection.push(activity);
        previousActivity = activity;
      }
    }
  }

  printSelection() {
    const all = this.activities.reduce((acc,item) => acc + "\t" + item.toString()),
      selection = this.selection.reduce((acc,item) => acc + "\t" + item.toString());
    console.log(`Activity Selection`)
    console.log(`All\t\t\t\t- ${all}`);
    console.log(`Selection - ${selection}`);
  }
}

const demo = () => {
  let as = new ActivitySelection()
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