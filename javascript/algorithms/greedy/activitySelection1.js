'use strict'

class Activity {
  constructor(action, start, end) {
    this.action = action;
    this.start = start;
    this.end = end;
  }

  toString() {
    return '[' + this.action + '|' + this.start + '->' + this.end + ']';
  }
}

class ActivitySelector {

  getMaxActivites(activities) {
    let output = [];
    this.print(activities);
    activities.sort((a,b) => a.end - b.end);
    console.log(`${activities}`);
    let previousActivity = new Activity('Dummy', -Infinity, -1);
    for(let activity of activities) {
      if(activity.start >= previousActivity.end) {
        output.push(activity);
        previousActivity = activity;
      }
    }
    return output;
  }


  print(input) {
    console.log(`${input.reduce((acc, item) => acc + item.toString() + '\t', [])}`);
  }
}

const demo = () => {
  let as = new ActivitySelector();

  let result = as.getMaxActivites([
    new Activity('A1', 0, 6),
    new Activity('A2', 3, 4),
    new Activity('A3', 1, 2),
    new Activity('A4', 5, 8),
    new Activity('A5', 5, 7),
    new Activity('A6', 8, 9)
  ]);

  console.log(`Max activities => ${result}`);
}

demo();