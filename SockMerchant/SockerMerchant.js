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
// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    // check edge cases
    if (n < 1 || n > 100) return 0;
    if (ar.length < 1 || ar.length > 100) return 0;
    // trade off between space and complexity. create a running tally of total times element occurs
    const sockArr = []
    ar.forEach(element => {
        if (sockArr[element] === undefined) {
            sockArr[element] = 1;
        } else {
            sockArr[element] += 1;
        }
    });
    return sockArr.reduce((acc, curr) => {
        /* count up each elements pairings e.g.
        [0,4,5,2]:
        0 -> 0
        4 -> 2 (2 pairs of 2)
        5 -> 2 (2 pairs of 2 with 1 remainder)
        2 -> 1
        if it's 1 then no pairings so dont modify accumulator
        */
        if (curr > 1) {
            if (curr % 2 === 0) acc += curr / 2
            if (curr % 2 !== 0) acc += Math.ceil((curr - 1) / 2)
        }
        return acc;
    }, 0)


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}