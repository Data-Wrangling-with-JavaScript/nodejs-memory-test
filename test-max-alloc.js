//
// Small program to test the maximum amount of allocations in multiple blocks.
// This script searches for the largest allocation amount.
//

//
// To run this program:
//
//  node --expose-gc test-max-alloc.js
//

//
// Allocate a certain size to test if it can be done.
//
var alloc = function (size) {
    //return Buffer.allocUnsafe(size); 
    var numbers = size / 8;
    var arr = []
    arr.length = numbers;
    for (var i = 0; i < numbers; i++) {
        arr[i] = i;
    }
    return arr;
};

//
// Keep allocations in referenced so they aren't garbage collected.
//
var allocations = []; 

//
// Allocate successively larger sizes, doubling each time until we hit the limit.
//
var allocToMax = function () {

    var allocationStep = 1024 * 1024 /*mb*/ * 10;
    var workingAllocationAmount = 0;

    while (true) {
        try {

            while (true) {
                console.log("Allocating " + allocationStep);

                // Allocate and keep a reference so the allocated memory isn't garbage collected.
                allocations.push(alloc(allocationStep));

                // Record how much we have allocated so far.
                workingAllocationAmount += allocationStep;

                console.log("Max " + workingAllocationAmount);
            }

            // Infinite loop, never get here.
        }
        catch (err) { // Memory allocation error.
            console.error(err);

            if (allocationStep <= 8) {
                return workingAllocationAmount; // Can't even allocation 8 bytes more. 
            }

            // Reduce allocation step and try again.
            if (allocationStep > 1024*1024) {
                allocationStep = 1024*1024;
            }
            else {
                allocationStep = Math.floor(allocationStep / 8);
            }

            console.log("Reducing step size to " + allocationStep);

            // Force garbage collection and reclaim.
            global.gc();            
        }
    }

    // Infinite loop, never get here.
};

allocToMax();