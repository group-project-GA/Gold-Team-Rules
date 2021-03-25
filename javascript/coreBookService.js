const API_URL = 'https://myapi-profstream.herokuapp.com/api/f97dfc';

class BookInfo {
    constructor(id, title, author, release_date, image) {
        this.id = id;
        this.title = title,
            this.author = author,
            this.release_date = release_date,
            this.image = image
    }
}

class CoreBookService {
    static async createNewBook(book) {
        const res = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)

        });
        const data = await res.json();
        const newBook = new BookInfo(data.id, data.title, data.author, data.release_date, data.image);
        return newBook;
    }

    static async getAllBooks() {
        const res = await fetch(`${API_URL}/books`);
        const data = await res.json();
        const allBooks = [];
        for (let i = 0; i < data.length; i++) {
            let newBook = new BookInfo(data[i].id, data[i].title, data[i].author, data[i].release_date, data[i].image);
            allBooks.push(newBook);
        }
        return allBooks;
    }

    static async getBookInfo(bookId) {
        const res = await fetch(`${API_URL}/books/${bookId}`);
        const bookInfo = await res.json();
        const currentBook = new BookInfo(bookInfo.id, bookInfo.title, bookInfo.author, bookInfo.release_date, bookInfo.image)
        return currentBook;
    }



}