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
 * The basic idea here is 2 fold: Break up the path into mountains and valleys so we can match them up (like bracket matching),
 * this will check to see that we're looking at a valid mountain or valley, then we check to see if we're looking at
 * a valley or a mountain -- and if it's a valley that is complete we count that as part of our score.
 * @param n
 * @param s
 * @returns {number}
 */
function countingValleys(n, s) {
    const pathStack = s.split(''); // turn input string into array that we'll treat as a stack
    // some basic edge test cases
    if (pathStack.length !== n) return -1;
    if (n < 2 || n > 10 ** 6) return -1;

    let pairings = []; // an array of our Us and Ds to match (once again like bracket matching!)
    let score = 0; // our running score
    let currentLevel = 0; // our current level. Will be 0 if on see level, <0 if below, >0 if above

    pathStack.forEach((p, index) => {
        p = p.toUpperCase(); // make life a bit easier for us here
        if (p == 'D') { // we're going down so our current level is also going down
            currentLevel--;
        } else { // otherwise we're going up
            currentLevel++;
        }
        if (currentLevel <= 0) { // if we're below see level
            if (p == 'D') { // push a slope (D) onto our 'stack'
                pairings.push(p)
            } else { // if we're below sea level and we're going up then pop it from our stack
                pairings.pop()
            }
            /* whatever comes up must come down: for a valley to be valid we must have equal parts Us and Ds.
            Note that this is all happening below sea level and therefore in the valley's domain
             */
        }
        if (currentLevel == 0) { // now that we're back at sea level
            // check if our valley was valid, and if we're coming from a valley (i.e. our proceeding direction is U
            if (pairings.length == 0 && p == 'U') score++
            pairings = []; // great let's now clean up our matching stack so we can try this again
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
