//
// Small program to test the maximum single allocation that Node.js can achieve.
// This script searches for the larget allocation size.
//

//
// Note this program invokes the garbage collector explicitly, so it must be run with the Node.js flag --expose-gc
//

//
// Allocate a certain size to test if it can be done.
//
var alloc = function (size) {
    return Buffer.allocUnsafe(size); 
};

//
// Allocate successively larger sizes, doubling each time until we hit the limit.
//
var allocUp = function (startingAllocationSize, allocationStep) {

    var lastAllocatedSize = 0;
    var workingAllocationSize = startingAllocationSize;
    var workingAllocationStep = allocationStep;

    try {

        while (true) {
            console.log("Allocating " + workingAllocationSize);

            alloc(workingAllocationSize);

            // Successfully allocated.
            lastAllocatedSize = workingAllocationSize;

            // Allocate more memory next time.
            workingAllocationSize += allocationStep;

            // Double the amount we are trying to allocate.
            allocationStep *= 2;

            // Force garbage collection and reclaim.
            global.gc();
        }

        // Infinite loop, never get here.
    }
    catch (err) { // Memory allocation error.
        console.error(err);

        console.log('Last successfull allocation: ' + lastAllocatedSize);
        console.log('Attempted to allocate: ' + workingAllocationSize);

        return {
            lastAllocatedSize: lastAllocatedSize,
            limit: workingAllocationSize,
        };
    }
};

var startingAllocationSize = 1024*10;
var startingAllocationStep = 8;
var lastResult = null;
var i = 0;

while (true) {
    var result = allocUp(startingAllocationSize, startingAllocationStep); // Allocate up until we hit a limit.
    console.log(result);

    startingAllocationSize = result.lastAllocatedSize;

    if (lastResult) {
        var difference = result.limit - result.lastAllocatedSize;
        console.log('Allocation difference ' + difference);
        if (difference <= startingAllocationStep) {
            break;
        }
    }

    if (++i > 10000) {
        break; // Saftey breakout.
    }

    lastResult = result;
}


