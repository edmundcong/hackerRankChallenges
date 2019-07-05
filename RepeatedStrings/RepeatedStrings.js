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

const findTotalOccurencesInString = (strArray) => {
    return strArray.reduce((acc, curr) => {
        if (curr == 'a') {
            acc++
        }
        return acc;
    }, 0);
}

/**
 * This one was fairly easier than the last few. Just find the occurence of 'a' in the string, multiply that by the
 * amount of times that string would exist in the larger string -- minus any leftovers -- then add the left overs on by
 * finding the amount 'a's in that string. E.g.
 * s = abcda, n = 12
 * There's an infinite string that goes abddaabcdaabcda...
 * First we see how many whole strings of s can fit into the first n digits which is:
 *  floor(n/|s|)
 *  this gives us 2 * abcda (or 10)
 * Next we just look at the remainder string which will be 2. We get this by modulo n and |s\
 *  this will give us 2
 *  we then just add the amount of occurrences of a within the first 2 characters of our string onto the tally
 * @param s
 * @param n
 * @returns {*}
 */
// Complete the repeatedString function below.
function repeatedString(s, n) {
    let total = 0;
    let multiplier = Math.floor(n / s.length)
    let remainder = n % s.length
    let sArray = s.split("");
    // find total occurence of 'a' in small substring
    let occFullword = findTotalOccurencesInString(sArray);
    total = (occFullword * multiplier)
    // find total occurences of 'a' in substring
    let occPartialword = findTotalOccurencesInString((s.slice(0, remainder)).split(""))
    return total + (occPartialword)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
