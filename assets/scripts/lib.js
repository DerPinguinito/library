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
    },
    searchFor(string) {
        const VALUES = [];
        if (!string.includes(',')) {
            VALUES.push(string.toLowerCase().trim());
        }
        if (string.includes(',')) {
            const DATA = string.split(',');
            DATA.forEach(value => {
                VALUES.push(value.toLowerCase().trim());
            });   
        }
        const MATCHES = [];
        LIBRARY.forEach(book => {
            if (VALUES.includes(book.title.toLowerCase()) || VALUES.includes(book.author.toLowerCase())) {
                MATCHES.push(book);
            }
        })
        return MATCHES;        
    }

}

export default lib;
