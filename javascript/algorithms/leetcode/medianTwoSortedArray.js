"use strict";

var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length && (!nums2 || !nums2.length)) {
    return median(nums1);
  } else if ((!nums1 || !nums1.length) && nums2.length) {
    return median(nums2);
  } else if ((!nums1 || !nums1.length) && (!nums2 || !nums2.length)) {
    return 0;
  } else {
    return medians(nums1, nums2);
  }
};

let median = nums => {
  let mid = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) {
    return (nums[mid - 1] + nums[mid]) / 2;
  } else {
    return nums[mid];
  }
};

let medians = (nums1, nums2, previousX = 0) => {
  let parts = partitionNums(nums1, nums2, previousX);
  let minX = nums1[parts.x - 1];
  if (minX === undefined) minX = -Infinity;
  let maxX = nums1[parts.x];
  if (maxX === undefined) maxX = Infinity;
  let minY = nums2[parts.y - 1];
  if (minY === undefined) minY = -Infinity;
  let maxY = nums2[parts.y];
  if (maxY === undefined) {
    if(nums2.length === 1 && nums2[0]) maxY = -Infinity;
    else maxY = Infinity;
  }
  if (minX > maxY) {
    return medians(nums1, nums2, (parts.x - 1) === 0 ? -parts.x : parts.x - 1);
  } else if (minY > maxX) {
    return medians(nums1, nums2, parts.x + 1);
  } else {
    if ((nums1.length + nums2.length) % 2 === 0) {
      let result = (Math.max(minX, minY) + Math.min(maxX, maxY)) / 2;
      return result.toFixed(1);
    } else {
      return Math.max(minX, minY);
    }
  }
};

let partitionNums = (nums1, nums2, previousX = 0) => {
  let partition1 = Math.floor((nums1.length + previousX) / 2);
  let partition2 =
    Math.floor((nums1.length + nums2.length + 1) / 2) - partition1;
  return {
    x: partition1,
    y: partition2
  };
};

// console.log(findMedianSortedArrays([], []));
// console.log(findMedianSortedArrays([0], [0]));
// console.log(findMedianSortedArrays([0, 0], [0, 0]));
// console.log(findMedianSortedArrays([], [7, 8, 9]));
// console.log(findMedianSortedArrays([], [1, 2, 3, 4]));
// console.log(findMedianSortedArrays([1, 2, 3, 4], []));
// console.log(findMedianSortedArrays([4, 5, 6], []));
// console.log(findMedianSortedArrays([2], []));
// console.log(findMedianSortedArrays([], [3]));
// console.log(findMedianSortedArrays([1, 2], [3, 4]));
// console.log(findMedianSortedArrays([3, 4], [1, 2]));
// console.log(findMedianSortedArrays([1,2,3,5,6], [4]));
console.log(findMedianSortedArrays([1,3], [2]));
