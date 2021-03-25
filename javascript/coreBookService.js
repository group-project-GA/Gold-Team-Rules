const API_URL = 'https://myapi-profstream.herokuapp.com/api/f97dfc';

class BookInfo {
    constructor(id, title, author, release_date, image) {
        this.id = id;
        this.title = title,
<<<<<<< HEAD
            this.author = author,
            this.release_date = release_date,
            this.image = image
=======
        this.author = author,
        this.release_date = released,
        this.image = image
>>>>>>> ec7fb0a69f8bc1e1f3f6681348a3c799d7083ef3
    }
}

class CoreBookService {
    static async createNewBook(book) {
        console.log(book)
        const res = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        console.log(res);
        const data = await res.json();
        console.log(data)
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
<<<<<<< HEAD
=======
        // console.log(allBooks);
>>>>>>> ec7fb0a69f8bc1e1f3f6681348a3c799d7083ef3
        return allBooks;
    }

    static async getBookInfo(bookId) {
        const res = await fetch(`${API_URL}/books/${bookId}`);
        const bookInfo = await res.json();
        const currentBook = new BookInfo(bookInfo.id, bookInfo.title, bookInfo.author, bookInfo.release_date, bookInfo.image)
        return currentBook;
    }



}