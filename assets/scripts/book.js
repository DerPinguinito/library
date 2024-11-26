export default function Book(title, author, publisher, year, pages, read = false) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year;
    this.pages = pages;
    this.read = read;

    this.changeReadStatus = function() {
        this.read = !this.read;
        return;
    }
}
