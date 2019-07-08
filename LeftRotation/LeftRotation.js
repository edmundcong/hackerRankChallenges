'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Note: I think there are inbuilt functions for splitting/merging arrays but this seemed more to the point of the problem
// Complete the rotLeft function below.
function rotLeft(a, d) {
    let arrSize = a.length; // get array size
    let newArr = new Array(arrSize); // create new array of size of passed in array
    // populate new array with entries starting from index d and going onwards
    for (let i = d; i < a.length; i++) {
        newArr[i - d] = a[i];
    }
    // populate new array with old values AFTER our shift to the left (we're shifting 0...a.length - d)
    for (let i = 0; i < d; i++) {
        newArr[i + (a.length - d)] = a[i];
    }
    return newArr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = rotLeft(a, d);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
