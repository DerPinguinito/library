import lib from './lib.js'


function getInputValues() {
    const bookTITLE = document.getElementById('btitle');
    const bookAUTHOR = document.getElementById('bauthor');
    const bookPUBLISHER = document.getElementById('bpublisher')
    const bookYEAR = document.getElementById('byear');
    const bookPAGES = document.getElementById('bpages');
    const bookREAD = document.getElementById('bread');

    const inputValues = {
        "title" : bookTITLE.value,
        "author" : bookAUTHOR.value,
        "publisher" : bookPUBLISHER.value,
        "year" : bookYEAR.value,
        "pages" : bookPAGES.value,
        "read" : bookREAD.checked ? true : false,
    }

    return inputValues;
}

function clearInputFields() {
    const bookTITLE = document.getElementById('btitle');
    const bookAUTHOR = document.getElementById('bauthor');
    const bookPublisher = document.getElementById('bpublisher');
    const bookYEAR = document.getElementById('byear');
    const bookPAGES = document.getElementById('bpages');
    const bookREAD = document.getElementById('bread');

    bookTITLE.value = '';
    bookAUTHOR.value = '';
    bookPublisher.value = '';
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
        const newBOOK = lib.setBook(VALUES.title, VALUES.author, VALUES.publisher, VALUES.year, VALUES.pages, VALUES.read);
        lib.addBookToLibrary(newBOOK);
        appendBookToTable(table, newBOOK);
        clearInputFields();
    })
}

function createDeleteButton() {
    const BUTTON = document.createElement('button');
    BUTTON.textContent = 'DELETE';
    return BUTTON;
}

function setDeleteButtonEvent(button) {
    button.addEventListener('click', () => {
        const TARGET = button.closest('tr');
        TARGET.parentNode.removeChild(TARGET);
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

function addDropDownListenerEvent(dropDownMenu, book) {
    dropDownMenu.addEventListener('change', () => {
        book.changeReadStatus();
    })
}

function createDropDownMenu(book) {
    const MENU = document.createElement('select');
    MENU.name = 'dropdown';
    MENU.id = 'dropdown';

    const optionREAD = document.createElement('option');
    optionREAD.textContent = 'read';
    optionREAD.value = true;
    optionREAD.selected = book.read ? true : null;

    const optionNOTREAD = document.createElement('option');
    optionNOTREAD.textContent = 'not read';
    optionNOTREAD.value = false;
    optionNOTREAD.selected = book.read ? null : true;

    MENU.appendChild(optionREAD);
    MENU.appendChild(optionNOTREAD);

    addDropDownListenerEvent(MENU, book);

    return MENU;
}

function appendBookToTable(table, book) {
 
    const TR = document.createElement('tr');
    const buttonCOLUMN = document.createElement('td');
    const TITLE = document.createElement('td');
    const AUTHOR = document.createElement('td');
    const PUBLISHER = document.createElement('td');
    const YEAR = document.createElement('td');
    const PAGES = document.createElement('td');
    const READ = document.createElement('td');

    TITLE.textContent = book.title;
    AUTHOR.textContent = book.author;
    PUBLISHER.textContent = book.publisher;
    YEAR.textContent = book.year;
    PAGES.textContent = book.pages;

    const MENU = createDropDownMenu(book);
    READ.appendChild(MENU);

    const deleteBUTTON = createDeleteButton();
    setDeleteButtonEvent(deleteBUTTON);
    buttonCOLUMN.appendChild(deleteBUTTON);

    TR.appendChild(buttonCOLUMN);
    TR.appendChild(TITLE);
    TR.appendChild(AUTHOR);
    TR.appendChild(PUBLISHER);
    TR.appendChild(YEAR);
    TR.appendChild(PAGES);
    TR.appendChild(READ);

    table.appendChild(TR);
}

function loadLibrary(table) {
    const LIBRARY = lib.loopThroughLibrary();
    LIBRARY.forEach(book => {
        appendBookToTable(table, book);
    })
}

function entryPoint() {
    // appends placeholder books
    const a = lib.setBook("book1", "author1", "publisher 1", 1001, 100, true);
    const b = lib.setBook("book2", "author1", "publisher 2", 1001, 100, true);
    lib.addBookToLibrary(a);
    lib.addBookToLibrary(b);

    const submitBUTTON = getButton('submit');
    const TABLE = getTableBody();
    loadLibrary(TABLE);
    setAddBookButtonEvent(submitBUTTON, TABLE);
}

function main() {
    entryPoint();
}

main();