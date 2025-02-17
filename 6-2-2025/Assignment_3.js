// Assignment 3: Analyzing JavaScript Heap Memory
// Task: Create a program that continuously adds data to an array to simulate a memory leak.
// Monitor heap memory usage using Chrome DevTools or performance.memory.
// Implement a cleanup mechanism to prevent memory issues.
//  Use Chrome DevTools to capture a memory snapshot and analyze retained objects to observe the simulated memory leak.


// const leakyArray = [];

// function createMemoryLeak() {
//     setInterval(() => {
//         let obj = new Array(1000000).fill("Memory Leak!");
//         leakyArray.push(obj);
//         console.log(`Added ${leakyArray.length} objects to the array.`);
//     }, 1000);
// }

// createMemoryLeak();

const leakyArray = [];

function createMemoryLeak() {
    setInterval(() => {
        let obj = new Array(1000000).fill("Memory Leak!");
        leakyArray.push(obj);

        
        if (leakyArray.length > 10) {
            leakyArray.shift();
        }

        console.log(`Current array size: ${leakyArray.length}`);
    }, 1000);
}

createMemoryLeak();

