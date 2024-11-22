export default function Book(title, author, year, pages, read = false) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}
