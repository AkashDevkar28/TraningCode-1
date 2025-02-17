// Assignment 4: Working with map(), filter(), and **reduce()
// Task 1: Use map() to transform data
// Create an array of product objects with properties name, price, and category.
// Use map() to create a new array with product names in uppercase.
// Task 2: Use filter() to extract specific data
// Use filter() to create an array of products that belong to the 'Electronics' category.
// Task 3: Use reduce() to calculate a total
// Use reduce() to calculate the total price of all products in the array.
// Task 4: Combine map(), filter(), and reduce()
// Create a function that calculates the total price of products from a specific category using map(), filter(), and reduce().


// Task 1: Use map() to transform data
const products = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shirt", price: 50, category: "Clothing" },
    { name: "Phone", price: 800, category: "Electronics" },
    { name: "Shoes", price: 120, category: "Clothing" },
    { name: "Headphones", price: 200, category: "Electronics" }
];

const upperCaseNames = products.map(product => product.name.toUpperCase());
console.log("Uppercase Product Names:", upperCaseNames);


// Task 2: Use filter() to extract specific data
const electronics = products.filter(product => product.category === "Electronics");
console.log("Electronics Products:", electronics);


// Task 3: Use reduce() to calculate a total
const totalPrice = products.reduce((total, product) => total + product.price, 0);
console.log("Total Price of All Products:", totalPrice);


// Task 4: Combine map(), filter(), and reduce()
function totalCategoryPrice(category) {
    return products
        .filter(product => product.category === category) // Filter by category
        .map(product => product.price) // Extract prices
        .reduce((total, price) => total + price, 0); // Sum up prices
}

console.log("Total Price of Electronics:", totalCategoryPrice("Electronics"));
