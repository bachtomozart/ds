/**
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function (seats) {
  if (seats.length === 2) return 1;
  let i = 0,
    j = 1,
    flag = false,
    distance = 0;
  while (j < seats.length) {
    if (seats[i] === seats[j]) {
      if (flag) {
        distance = Math.max(distance, Math.floor((j - i) / 2));
        i = j;
      }
    } else {
      if (!flag) {
        if(seats[i] === 0) {
          distance = j - i;
        } else {
          i = j - 1;
          flag = true;
        }
      }
    }
    j++;
  }
  if (flag) { 
    let newDistance = j - i - 1;
    if(distance === 0) {
      distance = newDistance;
    } else {
      if(seats[i] === 1 && seats[j] === 0) {
        distance = Math.max(distance, newDistance);
      }
    }
  }
  console.log(`${[...seats]} -> ${distance}`);
  return distance;
};

maxDistToClosest([1,0,0,0]);
maxDistToClosest([0,0,0,1]);
maxDistToClosest([1,0,0,0,1,0,0,0,0,0,1]);
maxDistToClosest([1,1,1,0,1]);
maxDistToClosest([0,0,1,0,1,1]);
maxDistToClosest([0,1,0,0,0,0]);