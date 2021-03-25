const API_URL = 'https://myapi-profstream.herokuapp.com/api/f97dfc';

class BookInfo {
    constructor(id, title, author, releaseDate, image) {
        this.id = id;
        this.title = title,
            this.author = author,
            this.releaseDate = releaseDate,
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
        console.log(data);
    }

    static async getAllBooks() {
        console.log(`${API_URL}/books`);
        const res = await fetch(`${API_URL}/books`);
        const data = await res.json();
        const allBooks = [];
        for (let i = 0; i < data.length; i++) {
            let newBook = new BookInfo(data[i].id, data[i].title, data[i].author, data[i].release_date, data[i].image);
            allBooks.push(newBook);
        }
        return allBooks;
    }

    async getBookInfo(bookId) {
        let res = await fetch(`${API_URL}/books/${bookId}`);
        let bookInfo = await res.json();
        currentBook = new BookInfo(bookInfo.id, bookInfo.title, bookInfo.author, bookInfo.release_date, bookInfo.image)
        return currentBook;
    }


}