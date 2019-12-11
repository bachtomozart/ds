function minimumHours(rows, columns, grid)
{
    // WRITE YOUR CODE HERE
    let zeroes = [];
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            if(grid[i][j] === 0) {
                zeroes.push([i, j]);
            }
        }
    }
    //console.log(JSON.stringify(zeroes));
    let time = 0;
    let converted = [];
    while(zeroes.length > 0) {
        for(let k = 0; k < zeroes.length; k++) {
            let i = zeroes[k][0], j = zeroes[k][1];
            let top = i-1 >= 0 ? grid[i-1][j] : null;
            let right = j+1 < columns ? grid[i][j+1] : null;
            let bottom = i+1 < rows ? grid[i+1][j] : null;
            let left = j-1 >= 0 ? grid[i][j-1] : null;
            if(top === 1 || right === 1 || bottom === 1 || left === 1) {
                converted.push(...zeroes.splice(k, 1));k--;
            }
        }
        for(let converts of converted) {
          grid[converts[0]][converts[1]] = 1;
        }
        converted = [];
        time++;
    }
    console.log(`${time}`);
    return time;
}

minimumHours(5,5,[
  [1,0,0,0,0],
  [0,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,0],
  [0,0,0,0,1],
])