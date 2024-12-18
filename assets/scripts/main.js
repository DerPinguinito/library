import lib from './lib.js'


function getInputValues() {
    const bookTITLE = document.getElementById('btitle');
    const bookAUTHOR = document.getElementById('bauthor');
    const bookPUBLISHER = document.getElementById('bpublisher')
    const bookYEAR = document.getElementById('byear');
    const bookPAGES = document.getElementById('bpages');
    const bookREAD = document.getElementById('bread');

    const inputValues = {
        "title" : bookTITLE.value.trim(),
        "author" : bookAUTHOR.value.trim(),
        "publisher" : bookPUBLISHER.value.trim(),
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

function setDeleteButtonEvent(button, book) {
    button.addEventListener('click', () => {
        const TARGET = button.closest('tr');
        TARGET.parentNode.removeChild(TARGET);
        lib.removeBook(book);
    })
}

function getTable() {
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

    const deleteBUTTON = createDeleteButton(); 
    setDeleteButtonEvent(deleteBUTTON, book);
    buttonCOLUMN.appendChild(deleteBUTTON);

    TITLE.textContent = book.title;
    AUTHOR.textContent = book.author;
    PUBLISHER.textContent = book.publisher;
    YEAR.textContent = book.year;
    PAGES.textContent = book.pages;

    const MENU = createDropDownMenu(book);
    READ.appendChild(MENU);

    TR.appendChild(buttonCOLUMN);
    TR.appendChild(TITLE);
    TR.appendChild(AUTHOR);
    TR.appendChild(PUBLISHER);
    TR.appendChild(YEAR);
    TR.appendChild(PAGES);
    TR.appendChild(READ);

    const tableBODY = table.querySelector('tbody');
    if (!tableBODY) {
        const BODY = document.createElement('tbody');
        table.appendChild(BODY);
        BODY.append(TR);
    }
    tableBODY.appendChild(TR);
}

function loadLibrary(table) {
    const LIBRARY = lib.loopThroughLibrary();
    LIBRARY.forEach(book => {
        appendBookToTable(table, book);
    })
}

function getSearchBox() {
    const searchBox = document.getElementById('sbox');
    return searchBox;
}

function wipeTableBody(table) {
    const BODY = table.querySelector('tbody');
    if (!BODY) {
        return;
    }
    BODY.parentNode.removeChild(BODY);
}

function setSearchButtonEvent(button, searchBox) {
    button.addEventListener('click', () => {
        if (!searchBox.value) {
            console.log('nothing to search for');
            return;
        };
        const bookMATCHES = lib.searchFor(searchBox.value);
        if (!bookMATCHES) {
            return;
        }
        const TABLE = getTable();
        wipeTableBody(TABLE);
        bookMATCHES.forEach(book => {
            appendBookToTable(TABLE, book);
        })
    })
}

function setSearchBoxEvent(searchBox) {
    searchBox.addEventListener('keyup', e => {
        const BUTTON = document.getElementById('search');
        if (e.keyCode === 13) {
            BUTTON.click();
        }
    })
}

function entryPoint() {
    // appends placeholder books
    const a = lib.setBook("The Bricks that Built the Houses", "Kae Tempest", "Bloomsbury USA", 2016, 416, true);
    const b = lib.setBook("Orlando", "Virginia Woolf", "Modern Classics", 2000, 336, true);
    lib.addBookToLibrary(a);
    lib.addBookToLibrary(b);

    const submitBUTTON = getButton('submit');
    const TABLE = getTable();
    loadLibrary(TABLE);
    setAddBookButtonEvent(submitBUTTON, TABLE);
    const searchBOX = getSearchBox();
    setSearchBoxEvent(searchBOX);
    const searchBUTTON = getButton('search');
    setSearchButtonEvent(searchBUTTON, searchBOX);
}

function main() {
    entryPoint();
}

main();