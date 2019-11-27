/**
 * @param {number} N
 * @return {number}
 */
var rotatedDigits = function(N) {
  let counter = 0;
  for(let i=0;i<=N;i++) {
      let set = new Set(Array.from(i.toString()).map(Number));
      if(set.has(3) || set.has(4) || set.has(7)) {
        continue;
      }
      if(set.has(2) || set.has(5) || set.has(6) || set.has(9)) {
        counter++;
      }
  }
  console.log(`${N} -> ${counter}`);
  return counter;
};

rotatedDigits(10000)


// DP Solution
const MAX = 1000000007
var numRollsToTarget = function(d, f, target) {
    let dp = new Array(target+1)
    dp.fill(0)
    dp[0] = 1
    for (let i = 1; i<=d; i++) {
        for (let j = target; j>=0; j--) {
            dp[j] = 0
            for (let k = 1; k<=f && k<=j; k++) {
                dp[j] = (dp[j] + dp[j - k]) % MAX
            }  
        }
    }
    return dp[target]
};


// numRollsToTarget(2,5,10);