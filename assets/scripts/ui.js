import Book from './book.js'


export const LIBRARY = []

const ui = {
    setBook(name, author, year, pages, read) {
        const BOOK = new Book(name, author, year, pages, read);
        return BOOK;
    },
    addBookToLibrary(book) {;
        LIBRARY.push(book);
    }
}

export default ui;