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

function getButton(id) {
    const BUTTON = document.getElementById(id);
    if (!BUTTON) {
        console.log(`Button ${id} not found`);
        return;
    }
    return BUTTON;
}

function setAddBookButtonEvent(button) {
    button.addEventListener('click', () => {
        const VALUES = getInputValues();
        if (!VALUES.title || !VALUES.author) { // prevents book from being added if values are missing
            console.log("Missing values");
            return;
        }
        const newBOOK = lib.setBook(VALUES.title, VALUES.author, VALUES.year, VALUES.pages, VALUES.read);
        lib.addBookToLibrary(newBOOK);
        lib.printLibrary(); // to be deleted
    })
}


function entryPoint() {
    const submitBUTTON = getButton('submit');
    setAddBookButtonEvent(submitBUTTON);
}

function main() {
    entryPoint();
}

main();