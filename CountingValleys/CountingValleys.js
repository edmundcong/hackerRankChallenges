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
 * The basic idea here is that everytime we encounter an 'up' at sea level we treat that as a valid, completed valley.
 * We can assume that if we have an incoming edge to 0 (sea level), then there must have been _some_ outgoing edge at
 * 0 sea level -- that is to say that we can assume every valley has a start. We do not care what the valleys look like.
 * This is a very powerful assumption we can run with as we then just need to count points at sea level that are coming
 * up.
 * @param n
 * @param s
 * @returns {number}
 */
function countingValleys(n, s) {
    const pathStack = s.split(''); // turn input string into array that we'll treat as a stack
    // some basic edge test cases
    if (pathStack.length !== n) return -1;
    if (n < 2 || n > 10 ** 6) return -1;

    let score = 0; // our running score
    let currentLevel = 0; // our current level. Will be 0 if on see level, <0 if below, >0 if above

    pathStack.forEach((p, index) => {
        p = p.toUpperCase(); // make life a bit easier for us here
        if (p == 'D') { // we're going down so our current level is also going down
            currentLevel--;
        } else { // otherwise we're going up
            currentLevel++;
        }
        if (currentLevel == 0) { // now that we're back at sea level
            // check if we're coming from a valley (i.e. our proceeding direction is U
            if (p == 'U') score++
            // otherwise we're coming from a 'D' (we're at the foot of a mountain) so ignore so ignore so ignore
        }
    })
    return score;
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    let result = countingValleys(n, s);

    ws.write(result + "\n");
    ws.end();
}
