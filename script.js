const LIBRARY = [];


function Book(name, author, year, pages, read = false) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}


function setBook(name, author, year, pages, read) {
    const BOOK = new Book(name, author, year, pages, read);
    return BOOK;
}

function addBookToLibrary(book) {;
    LIBRARY.push(book);
}

