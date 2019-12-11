'use strict'

let getDeletion = (s1, s2) => {
  if(s1.length === 0) return s2.length;
  if(s2.length === 0) return s1.length;
  let dp = Array.from({length:s1.length}, () => Array(s2.length).fill(0));
  let result = dd(dp, s1, s2);
  console.log(`${s1} and ${s2} -> ${result}`);
  return result;
};

let dd = (dp, s1, s2, p1 = 0, p2 = 0) => {
  if(p1 >= s1.length && p2 >= s2.length) return 0;
  if(p1 >= s1.length) return s2.length > s1.length ? s2.length - p1 : 0;
  if(p2 >= s2.length) return s1.length > s2.length ? s1.length - p2 : 0;
  if(dp[p1][p2] !== 0) return dp[p1][p2];
  if(s1[p1] === s2[p2]) {
    return dd(dp, s1, s2, p1+1, p2+1);
  }
  let ds1 = 1 + dd(dp, s1, s2, p1+1, p2);
  let ds2 = 1 + dd(dp, s1, s2, p1, p2+1);
  let ds12 = 2 + dd(dp, s1, s2, p1+1, p2+1);
  dp[p1][p2] = Math.min(ds1, ds2, ds12);
  return dp[p1][p2];
};

// getDeletion('heat','hit'); // 3
getDeletion('dog','god'); // 3
// getDeletion('','god'); // 3
// getDeletion('dog',''); // 3
// getDeletion('',''); // 3
// getDeletion('some','thing'); // 3