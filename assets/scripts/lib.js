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
        LIBRARY.forEach(book => {
            console.log(`${book.title} was written by ${book.author} in ${book.year}. It is ${book.pages} pages long.`);
        })
    }
}

function entryPoint() {
    const a = lib.setBook("book1", "author1", 1001, 100, true);
    const b = lib.setBook("book2", "author1", 1001, 100, true);
    lib.addBookToLibrary(a);
    lib.addBookToLibrary(b);
    lib.loopThroughLibrary();
}

function run() {
    entryPoint();
}

run();


export default lib;