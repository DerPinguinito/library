import lib from './lib.js'


function getInputValues() {
    const bookTITLE = document.getElementById('btitle');
    const bookAUTHOR = document.getElementById('bauthor');
    const bookYEAR = document.getElementById('byear');
    const bookPAGES = document.getElementById('bpages');
    const bookREAD = document.getElementById('bread');

    const inputValues = {
        "title" : bookTITLE.value,
        "author" : bookAUTHOR.value,
        "year" : bookYEAR.value,
        "pages" : bookPAGES.value,
        "read" : bookREAD.checked ? true : false,
    }

    return inputValues;
}

function clearInputFields() {
    const bookTITLE = document.getElementById('btitle');
    const bookAUTHOR = document.getElementById('bauthor');
    const bookYEAR = document.getElementById('byear');
    const bookPAGES = document.getElementById('bpages');
    const bookREAD = document.getElementById('bread');

    bookTITLE.value = '';
    bookAUTHOR.value = '';
    bookYEAR.value = '';
    bookPAGES.value = '';
    bookREAD.checked = false;
}

function getButton(id) {
    const BUTTON = document.getElementById(id);
    if (!BUTTON) {
        console.log(`Button ${id} not found`);
        return;
    }
    return BUTTON;
}

function setAddBookButtonEvent(button, table) {
    button.addEventListener('click', () => {
        const VALUES = getInputValues();
        if (!VALUES.title || !VALUES.author) { // prevents book from being added if values are missing
            console.log("Missing values");
            return;
        }
        const newBOOK = lib.setBook(VALUES.title, VALUES.author, VALUES.year, VALUES.pages, VALUES.read);
        lib.addBookToLibrary(newBOOK);
        appendBookToTable(table, newBOOK);
        clearInputFields();
    })
}

function getTableBody() {
    const TABLE = document.getElementsByTagName('table')[0];
    if (!TABLE) {
        console.log("Table not found");
        return;
    }
    return TABLE;
}

function appendBookToTable(table, book) {
 
    const TR = document.createElement('tr');

    const TITLE = document.createElement('td');
    const AUTHOR = document.createElement('td');
    const YEAR = document.createElement('td');
    const PAGES = document.createElement('td');
    const READ = document.createElement('td');

    TITLE.textContent = book.title;
    AUTHOR.textContent = book.author;
    YEAR.textContent = book.year;
    PAGES.textContent = book.pages;
    READ.textContent = book.read ? "Read" : "Not Read";

    TR.appendChild(TITLE);
    TR.appendChild(AUTHOR);
    TR.appendChild(YEAR);
    TR.appendChild(PAGES);
    TR.appendChild(READ);

    table.appendChild(TR);
}


function entryPoint() {
    const submitBUTTON = getButton('submit');
    const TABLE = getTableBody();
    setAddBookButtonEvent(submitBUTTON, TABLE);
}

function main() {
    entryPoint();
}

main();