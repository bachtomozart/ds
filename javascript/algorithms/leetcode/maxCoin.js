


class MaxCoins {
  constructor() {
    this.map = new Map();
  }
  
  reInitialize(nums) {
    this.map = new Map([
        [-1, 1],
        [nums.length, 1]
    ]);
  }

  getMaxCoins(nums) {
    this.reInitialize(nums);
    return this.findMaxCoins(nums);
  }
  
  findMaxCoins(nums, pos = 0) {
    if(pos < 0 || pos >= nums.length) return 0;
    let newNums = nums.slice(pos+1, nums.length);
    let skipNums = [...[nums[pos]], ...nums.slice(pos+2, nums.length)];
    let burst = this.burst(nums,pos) + this.findMaxCoins(newNums, pos);
    let skip = this.burst(nums, pos+1) + this.findMaxCoins(skipNums, pos);
    return Math.max(burst, skip);
  }

  burst(nums,pos) {
    let result = this.access(nums,pos-1) * this.access(nums,pos) * this.access(nums,pos+1);
    return result;
  }
  
  access(nums, pos) {
    if (pos < 0 || pos >= nums.length) return 1;
    return nums[pos];
  }
  
}

const maxCoins = (nums) => {
  let mc = new MaxCoins();
  let result = mc.getMaxCoins(nums);
  console.log(`${result}`);
  return result;
};

// maxCoins([3,1,5,8]);

var numTilePossibilities = function(tiles) {
  let result = new Set();
  for(let i=0;i<tiles.length;i++) {
      result.add(tiles[i]);
      let tempResult = new Set([...result]);
  }
  return result.size;
};

numTilePossibilities('AAB')