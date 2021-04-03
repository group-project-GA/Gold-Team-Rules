const API_URL = 'http://localhost:3000';

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
    static error = null
    static response = null;

    static async createNewBook(book) {
        try {
            const res = await fetch(`${API_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            const data = await res.json();
            this.response = new BookInfo(data.id, data.title, data.author, data.release_date, data.image);
        } catch (error) {
            this.error = error
        }

        return {
            error: this.error,
            data: this.response
        };
    }

    static async getAllBooks() {
        try {
            const res = await fetch(`${API_URL}/books`);
            const data = await res.json();
            const allBooks = [];
            for (let i = 0; i < data.length; i++) {
                let newBook = new BookInfo(data[i].id, data[i].title, data[i].author, data[i].release_date, data[i].image);
                allBooks.push(newBook);
            }
            this.response = allBooks;
        } catch (error) {
            this.error = error
        }
        return {

            error: this.error,
            data: this.response
        };
    }

    static async getBookInfo(bookId) {
        try {
            const res = await fetch(`${API_URL}/books/${bookId}`);
            const bookInfo = await res.json();
            this.response = new BookInfo(bookInfo.id, bookInfo.title, bookInfo.author, bookInfo.release_date, bookInfo.image);

        } catch (error) {
            this.error = error
        }

        return {
            error: this.error,
            data: this.response
        };
    }

    static async editBookInfo(bookId, book) {
        try {
            const res = await fetch(`${API_URL}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            this.response = null;

        } catch (error) {
            this.error = error
        }

        return {
            error: this.error,
            data: this.response
        };
    }

    static async removeBook(currentBookId) {
        try {
            const res = await fetch(`${API_URL}/books/${currentBookId}`,
                {
                    method: 'delete'
                });
            this.response = null;
        } 
        catch (error) {
            this.error = error;
        }
        return {
            error: this.error,
            data: this.response
        };

    }

}