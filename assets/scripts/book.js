export default function Book(name, author, year, pages, read = false) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}
