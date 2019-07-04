'use strict';
// Complete the countingValleys function below.
function countingValleys(n, s) {
    if (n < 2 || n > 10 ** 6) return -1;
    // turn input string into array that we'll treat as a stack
    const pathStack = s.split('');
    let pairings = [];
    let score = 0;
    let sealevel = 0;
    let [start, finish, distanceFromSeaLevel, walkValue] = [0,0,0,0];
    let incomingDirection = '';
    if (pathStack.length !== n) return -1;
    pathStack.forEach((p, index) => {
        // first path direction
        if (index == 0) {
            start = 0
            if (p.toUpperCase() == 'D') {
                incomingDirection = p
                pairings.push(p)
                distanceFromSeaLevel--
            } else {
                incomingDirection = p
                pairings.pop()
                distanceFromSeaLevel++
            }
        } else {

            if (p.toUpperCase() == 'D') {
                incomingDirection = p
                pairings.push(p)
                distanceFromSeaLevel--
            } else {
                incomingDirection = p
                pairings.pop()
                distanceFromSeaLevel++
            }
            if (distanceFromSeaLevel == 0) {
                // if we're coming from up (u->d)
                if (incomingDirection == 'U') {
                    pairings = []
                } else {
                     score = pairings.length
                }
            }
        }
    })
    return score;
}

console.log(countingValleys(2, "UD"))
