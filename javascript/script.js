//HTML elements
const allBooksButton = document.querySelector("#all");
const createNewButton = document.querySelector("#create");
const allBooksSection = document.querySelector(".books");
const bookInfoSection = document.querySelector(".current-book");
const directory = document.querySelector(".directory");
const editButtonsSection = document.querySelector(".edit-buttons")
const deleteButton = document.querySelector(".delete");
const editButton = document.querySelector('.edit');
const formSection = document.querySelector('.input-forms');
const formInput = document.querySelector('#form-input');
const spinner = document.getElementById("spinner");

//VARIABLES
let currentBookId;
let currentBook;
let editing = false;

//CONSTANTS
const BOOK_COLORS = ['blueBook', 'greenBook', 'orangeBook', 'redBook', 'yellowBook'];
const CREATE_BOOK_FIELDS = ['title', 'author', 'releaseDate', 'image'];

//FUNCTIONS
// get index of books from api
const getAllBooks = async () => {
    // clear all books
    removeAllChildren(allBooksSection);
    // show spinner
    showSpinner();
    const { error, data } = await CoreBookService.getAllBooks();
    // hide spinner
    hideSpinner();
    if (error) {
        // display error message
        displayErrorMessage(error)
    }
    else {
        for (let i = 0; i < data.length; i++) {
            // new divs for each book
            const newBookDiv = document.createElement('div');
            const newBookTitle = document.createElement('div');
            // add random color class
            newBookDiv.classList.add(BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)]);
            // set div id to books api id
            newBookTitle.id = data[i].id;
            // set book title
            newBookTitle.innerHTML = data[i].title;
            newBookTitle.classList.add('bookTitle');
            newBookTitle.id = data[i].id;
            allBooksSection.append(newBookDiv);
            newBookDiv.append(newBookTitle);
        }

    }
}

// display details of book
const getBookInfo = bookInfo => {
    // set current book id
    currentBookId = bookInfo.id;
    // get current book
    currentBook = bookInfo;
    // hide index and forms, display details
    allBooksSection.classList.add('hide');
    formSection.classList.add('hide');
    bookInfoSection.classList.remove('hide');
    editButtonsSection.classList.remove("hide");
    directory.innerHTML = `Details for ${bookInfo.title}`
    // get book cover image and add to DOM
    let displayImage = document.createElement('img');
    displayImage.src = bookInfo.image;
    bookInfoSection.append(displayImage);
    // get book info and add to DOM
    let infoList = document.createElement('dl');
    infoList.classList.add('book-info');
    bookInfoSection.append(infoList);
    for (key in bookInfo) {
        if (key === "title" || key === "author" || key === "release_date") {
            let listItemName = key.charAt(0).toUpperCase() + key.slice(1);
            let listItems = document.createElement('dt');
            let listDescription = document.createElement('dd');
            // set elements IDs to the property key
            listItems.id = key;
            listItems.innerHTML = `${listItemName}:`;
            infoList.append(listItems);
            // display books info
            if (listItems.id === "title") {
                listDescription.innerHTML = bookInfo.title;
            } else if (listItems.id === "author") {
                listDescription.innerHTML = bookInfo.author;
            } else if (listItems.id === "release_date") {
                listItems.innerHTML = 'Released:'
                listDescription.innerHTML = bookInfo.release_date;
            }
            listItems.append(listDescription);
        }
    }
}

// clear html sections
const removeAllChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
// delete a book
const removeBook = async () => {
    // show spinner
    showSpinner();
    const { error, data } = await CoreBookService.removeBook(currentBookId);
    // hide spinner
    hideSpinner();
    if (error) {
        // display error message
        displayErrorMessage(error);
    }
    else {
        // reload all books
        bookInfoSection.classList.add('hide');
        editButtonsSection.classList.add('hide');
        getAllBooks();
        allBooksSection.classList.remove('hide');
    }
}

// clear validation messages
const clearFieldsErrorMessage = (fields) => {
    let i, l = fields.length;
    let fieldName, messageDiv;
    for (i = 0; i < l; i++) {
        fieldName = fields[i];
        messageDiv = document.querySelector(`#${fieldName} + .message`);
        messageDiv.innerHTML = "";
    }

}
// display validation messages
const displayValidations = (validations) => {
    // clear messages
    clearFieldsErrorMessage(CREATE_BOOK_FIELDS);
    validations.map(validation => {
        let fieldName = Object.keys(validation)[0];
        const messageDiv = document.querySelector(`#${fieldName} + .message`);
        messageDiv.innerHTML = validation[fieldName]["message"];
    });
}

const showSpinner = () => {
    spinner.removeAttribute('hidden');
    formSection.classList.add('hide');
}

const hideSpinner = () => {
    spinner.setAttribute('hidden', '');
}

const displayErrorMessage = (message) => {
    alert(message);
}


//EVENT LISTENERS
// click on a book
allBooksSection.addEventListener("click", async (e) => {
    if (e.target.id) {
        const bookId = e.target.id;
        // show spinner
        showSpinner();
        const { error, data } = await CoreBookService.getBookInfo(bookId);
        // hide spinner
        hideSpinner();
        if (error) {
            // display error message
            displayErrorMessage(error);
        }
        else {
            getBookInfo(data);
        }
    }
})

// display index view when 'All Books' is clicked
allBooksButton.addEventListener("click", () => {
    // clear details of book
    removeAllChildren(bookInfoSection);
    removeAllChildren(allBooksSection);
    // hide other divs
    formSection.classList.add('hide');
    bookInfoSection.classList.add('hide');
    // get all books
    getAllBooks();
    // display all books
    allBooksSection.classList.remove('hide');
    editButtonsSection.classList.add('hide');
    directory.innerHTML = "Index of All Books";
})
// create a new book button
createNewButton.addEventListener("click", () => {
    // clear validation messages
    clearFieldsErrorMessage(CREATE_BOOK_FIELDS);
    // clear input forms
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#releaseDate').value = '';
    document.querySelector('#image').value = '';
    // not editing
    editing = false;
    // remove details
    removeAllChildren(bookInfoSection);
    // hide all areas and display input forms
    bookInfoSection.classList.add('hide');
    allBooksSection.classList.add('hide');
    editButtonsSection.classList.add('hide');
    directory.innerHTML = "New Book Details";
    formSection.classList.remove('hide');
    clearFieldsErrorMessage(CREATE_BOOK_FIELDS);
});

// submit button - for create and edit
formInput.addEventListener("submit", async (e) => {
    e.preventDefault();
    let createdBook;
    const form = e.target;
    const [isValid, results] = validateForm(form, CREATE_BOOK_FIELDS);
    if (!isValid) {
        displayValidations(results);
    }
    else {
        clearFieldsErrorMessage(CREATE_BOOK_FIELDS);
        const title = form.title.value;
        const author = form.author.value;
        const releaseDate = form.releaseDate.value;
        const image = form.image.value;
        const newBoook = new BookInfo(1, title, author, releaseDate, image);
        // check if editing a book instead of creating
        if (editing) {
            // show spinner
            showSpinner();
            const { error, data } = await CoreBookService.editBookInfo(currentBookId, newBoook);
            // hide spinner
            hideSpinner();
            if (error) {
                // display error message
                displayErrorMessage(error);
            }
            else {
                createdBook = newBoook;
                // clear forms
                document.querySelector('#title').value = '';
                document.querySelector('#author').value = '';
                document.querySelector('#releaseDate').value = '';
                document.querySelector('#image').value = '';
                // show book details
                getBookInfo(createdBook);
            }

        }
        else {
            // show spinner
            showSpinner();
            const { error, data } = await CoreBookService.createNewBook(newBoook);
            // hide spinner
            hideSpinner();
            if (error) {
                // display error message
                displayErrorMessage(error);
            }
            else {
                createdBook = data;
                // clear forms
                document.querySelector('#title').value = '';
                document.querySelector('#author').value = '';
                document.querySelector('#releaseDate').value = '';
                document.querySelector('#image').value = '';
                // show book details
                getBookInfo(createdBook);
            }
        }

    }
});

// delete book
deleteButton.addEventListener("click", () => {
    removeBook();
})

// edit book
editButton.addEventListener('click', async () => {
    // editing
    editing = true;
    // clear details
    removeAllChildren(bookInfoSection);
    // clear validation messages
    clearFieldsErrorMessage(CREATE_BOOK_FIELDS);
    // display input forms and 'Editing (book title)'
    bookInfoSection.classList.add('hide');
    allBooksSection.classList.add('hide');
    editButtonsSection.classList.add('hide');
    directory.innerHTML = `Editing ${currentBook.title}`;
    formSection.classList.remove('hide');
    // populate input forms
    document.querySelector('#title').value = currentBook.title;
    document.querySelector('#author').value = currentBook.author;
    document.querySelector('#releaseDate').value = currentBook.release_date;
    document.querySelector('#image').value = currentBook.image;
    clearFieldsErrorMessage(CREATE_BOOK_FIELDS)

    // submit button handles the rest
})

//initialize
window.addEventListener("load", getAllBooks);
