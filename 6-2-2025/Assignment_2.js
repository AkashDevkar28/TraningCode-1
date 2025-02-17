// Assignment 2: Working with Objects
// Task: Create an object bookLibrary to manage a collection of books.
// The object should have the following properties and methods:
// books: An array of book objects (each book has title, author, and yearPublished).
// addBook(book): Adds a new book to the collection.
// getBooksByAuthor(author): Returns all books by a given author.
// removeBook(title): Removes a book by title.
// Add a method getAllBooks to return a list of all book titles.


const bookLibrary={
    books: [],

    addBook(book){
        this.books.push(book);
    },

    getBooksByAuthor(author){
        return this.books.filter(book => book.author === author);
    },

    removeBook(title){
        this.books =this.books.filter(book => book.title !== title)

    },

    getAllBooks(){
        return this.books.map(book => book.title);
    }
};


bookLibrary.addBook({title: "because lif is a gift", author: "Disha", yearPublished: 2015});
bookLibrary.addBook({title: "The epic Shits", author: "F. Scott Fitzgerald", yearPublished: 2010});
bookLibrary.addBook({title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1999});

console.log('Books by Author: ',bookLibrary.getBooksByAuthor('Disha'));
console.log('All Books: ',bookLibrary.getAllBooks());
console.log(bookLibrary.removeBook('The Great Gatsby'));
console.log("After Removing 'The Great Gatsby':", bookLibrary.getAllBooks());


// Output
// All Books: [ 'because lif is a gift', 'The epic Shits', 'The Great Gatsby']
// Books by Disha: [ {title: "because lif is a gift", author: "Disha", yearPublished: 2015 } ]
// After Removing 'The Great Gatsby': [ 'because lif is a gift', 'The epic Shits' ]
