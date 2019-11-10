'use strict'

class ZigZagConversion {
  constructor() {

  }

  getConversion(s, numRows) {
    if(numRows === 1) return s;
    let output = "";
    let incrementer = numRows + (numRows - 2);
    for (let i = 0; i < numRows; i++) {
      let offset = (2 * i) + 1;
      if (i === 0 || i === numRows - 1) offset = undefined;
      let j = i;
      while (j < s.length) {
        output += s[j];
        if (offset) {
          let off = (j + incrementer) - offset + 1;
          if (off < s.length) output += s[off];
        }
        j += incrementer;
      }
    }
    console.log(`output -> ${output}`);
    return output;
  }

}

const demo = () => {
  let zzc = new ZigZagConversion();
  zzc.getConversion("PAYPALISHIRING", 1);
}

demo();