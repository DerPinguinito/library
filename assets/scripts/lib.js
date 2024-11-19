import Book from './book.js'


const LIBRARY = []

const lib = {
    setBook(name, author, year, pages, read) {
        const BOOK = new Book(name, author, year, pages, read);
        return BOOK;
    },
    addBookToLibrary(book) {;
        LIBRARY.push(book);
    },
    printLibrary() {
        console.log(LIBRARY);
    }
}

export default lib;