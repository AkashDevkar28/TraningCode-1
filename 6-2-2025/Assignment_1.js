// Assignment 1: Callback Functions
// Task: Write a function fetchData that simulates fetching data from a server using a callback function.
// The function should take a callback that processes the data after a delay of 2 seconds.
// Use setTimeout to simulate the server delay.
// The data should be an array of user names.
// Implement error handling in the callback function to simulate a case where the server might fail.


function fetchData(callback){
    setTimeout(() => {
        const success = Math.random() > 0.2;
        if(success){
            const data = ['abc','pqr','xyz']
            callback(null, data);
        }else{
            callback('Error fetching data', null);
        }
    },2000);
}

fetchData((error,data) => {
    if(error){
        console.error(error);
    }else{
        console.log('Fetched data: ',data);
    }
})


// output
// if success 
// Fetched data: ['abc', 'pqr', 'xyz']

// if !success
// Error fetching data