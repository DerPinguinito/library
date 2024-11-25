import Book from './book.js'


const LIBRARY = []

const lib = {
    setBook(title, author, year, pages, read) {
        const BOOK = new Book(title, author, year, pages, read);
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
    }
}

export default lib;
