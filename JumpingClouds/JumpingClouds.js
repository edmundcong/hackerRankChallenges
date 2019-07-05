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

/**
 * Greedy approach:
 * We rely heavily on the condition that it's "always possible to win at this game". This means there will never be a
 * case where there are 2 bad clouds in a row since we wouldn't be able to jump over them. This means that at each cloud
 * leap we can give preferential treatment to a 2-jump over a 1-jump -- as a 1-jump will never be a worse result locally
 * but better result globally since having no 2 bad clouds in a row effectively prunes this possibility.
 * @param c
 * @returns {number}
 */
function jumpingOnClouds(c) {
    // edge case checking
    if (c[0] !== 0 || c[c.length - 1] !== 0) return -1;
    let total = 0; // running score
    // we need to modify our looping index so we'll use a traditional for loop here
    for (let i = 0; i < c.length;) {
        // prefer a 2-jump
        if (c[i + 2] !== undefined && c[i + 2] !== 1) {
            total++;
            i += 2;
        } else if (c[i + 1] !== undefined && c[i + 1] !== 1) { // otherwise see if we can do a 1-jump
            total++;
            i++;
        } else { // otherwise just move onto the next cloud as this is a bad cloud or we're at the end
            i++;
        }
    }
    return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);

    ws.write(result + "\n");

    ws.end();
}
