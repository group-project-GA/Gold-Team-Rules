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

//VARIABLES
let currentBookId;

//CONSTANTS
const BOOK_COLORS = ['blueBook', 'greenBook', 'purpleBook', 'redBook', 'yellowBook'];

//FUNCTIONS
// get index of books from api
const getAllBooks = async () => {
    const data = await CoreBookService.getAllBooks();
    for (let i = 0; i < data.length; i++) {
        // new divs for each book
        const newBookDiv = document.createElement('div');
        const newBookTitle = document.createElement('div');
        // add random color class
        newBookDiv.classList.add(BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)]);
        // newBookDiv.classList.add('book');
        newBookTitle.id = data[i].id;
        // set book title
        newBookTitle.innerHTML = data[i].title;
        newBookTitle.classList.add('bookTitle');
        newBookTitle.id = data[i].id;
        allBooksSection.append(newBookDiv);
        newBookDiv.append(newBookTitle);
    }
}

// display details of book
const getBookInfo = bookInfo => {
    // set current book id
    currentBookId = bookInfo.id;
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
        }
    }
}

const removeAllChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
// delete single book
const removeBook = async () => {
    let res = await fetch(`https://myapi-profstream.herokuapp.com/api/f97dfc/books/${currentBookId}`,
        {
            method: 'delete'
        });
    location.reload()
    return res
}


//EVENT LISTENERS

allBooksSection.addEventListener("click", async (e) => {
    if (e.target.id) {
        const bookId = e.target.id;
        const bookInfo = await CoreBookService.getBookInfo(bookId);
        getBookInfo(bookInfo);
    }
})

// display index view when 'All Books' is clicked
allBooksButton.addEventListener("click", () => {
    // clear details of book
    removeAllChildren(bookInfoSection);
    bookInfoSection.classList.add('hide');
    // display all books
    allBooksSection.classList.remove('hide');
    editButtonsSection.classList.add('hide')
    directory.innerHTML = "Index of All Books"

})

createNewButton.addEventListener("click", () => {
    removeAllChildren(bookInfoSection);
    bookInfoSection.classList.add('hide');
    allBooksSection.classList.remove('hide');
    editButtonsSection.classList.add('hide');
    directory.innerHTML = "Index of All Books";
    formSection.classList.remove('hide');

});

formInput.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const releaseDate = form.releaseDate.value;
    const image = form.image.value;
    const newBoook = new BookInfo(1, title, author, releaseDate, image);
    console.log(newBoook)
    const createdBook = await CoreBookService.createNewBook(newBoook);
    console.log(createdBook);
    getBookInfo(createdBook);
});

deleteButton.addEventListener("click", () => {
    console.log('click');
    removeBook();
})

window.addEventListener("load", getAllBooks);
