import Book from './book.js'


const LIBRARY = []

const lib = {
    setBook(title, author, publisher, year, pages, read) {
        const BOOK = new Book(title, author, publisher, year, pages, read);
        return BOOK;
    },
    addBookToLibrary(book) {
        LIBRARY.push(book);
    },
    printLibrary() {
        console.log(LIBRARY);
    },
    loopThroughLibrary() {
        const lb = []
        LIBRARY.forEach(book => {
            lb.push(book);
        })
        return lb;
    },
    removeBook(book) {
        const i = LIBRARY.indexOf(book);
        LIBRARY.splice(i, 1);
    }
}

export default lib;
