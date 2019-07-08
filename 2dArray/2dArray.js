'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hourglassSum function below.
/*
* Notes:
* when iterating through each line, for the first capture 2 groups of 3, then for the next capture 2 groups of 1
* */
function hourglassSum(arr) {
    // arrays for value-sum of top of hour glass, middle, bottom
    let top = (new Array(4)).fill(0);
    let mid = (new Array(4)).fill(0);
    let bottom = (new Array(4)).fill(0);
    let max = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; i++) {
            if (i >= 0 && i < 3) {
                top[0]+=arr[i][j]
            }
            if (i >= 1 && i < 4) {
                top[1]+=arr[i][j]
            }
            if (i >= 2 && i < 5) {
                top[2]+=arr[i][j]
            }
            if (i >= 3 && i < 6) {
                top[3]+=arr[i][j]
            }
        }
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
