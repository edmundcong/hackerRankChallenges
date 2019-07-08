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
function hourglassSum(arr) {
    // arrays for value-sum of top of hour glass, middle, bottom
    let min = -9 * 7; // min as per -9 <= arr[i][j] <= 9 constraint
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 5; j++) {
            let curr = 0;
            curr += arr[i - 1][j - 1] + arr[i - 1][j] + arr[i - 1][j + 1] // row above it
            curr += arr[i][j] // middle row
            curr += arr[i + 1][j - 1] + arr[i + 1][j] + arr[i + 1][j + 1] // row below it
            if (curr > min) {
                min = curr;
            }
        }
    }
    return min;
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
