/**
 * @param {number[]} seats
 * @return {number}
 */
var maxDistToClosest = function (seats) {
  if (seats.length === 2) return 1;
  let i = 0,
    j = 0,
    flag = false,
    distance = 0;
  while (j < seats.length) {
    if (seats[j] === 1) {
      if (!flag) {
        distance = j - i;
        flag = true;
      } else {
        distance = Math.max(distance, Math.floor((j - i) / 2));
      }
      i = j;
    }
    j++;
  }
  distance = Math.max(distance, j - i - 1);
  console.log(`${[...seats]} -> ${distance}`);
  return distance;
};

maxDistToClosest([1, 0, 0, 0]);
maxDistToClosest([0, 0, 0, 1]);
maxDistToClosest([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
maxDistToClosest([1, 1, 1, 0, 1]);
maxDistToClosest([0, 0, 1, 0, 1, 1]);
maxDistToClosest([0, 1, 0, 0, 0, 0]);