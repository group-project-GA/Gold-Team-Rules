//HTML elements
const allBooksButton = document.querySelector("#all");
const createNewButton = document.querySelector("#create");
const allBooksSection = document.querySelector("#books");
const bookInfoSection = document.querySelector(".current-book");
const directory = document.querySelector("#directory");
const editButtonsSection = document.querySelector(".edit-buttons")
const deleteButton = document.querySelector(".delete");
const editButton = document.querySelector('.edit');

<<<<<<< HEAD:script.js

=======
console.log(editButtonsSection);
>>>>>>> dc3a3233b32f70f36253133639745e6198393413:javascript/script.js

//CONSTANTS
class CurrentBookInfo {
    constructor(title, author, released) {
        this.title = title,
            this.author = author,
            this.released = released
    }
}

//VARIABLES
let currentBook;

//FUNCTIONS
// get index of books from api
const getAllBooks = async () => {
    let res = await fetch('https://myapi-profstream.herokuapp.com/api/f97dfc/books');
    let data = await res.json();

    // create new div elements for each book and assign them css classes
    for (let i = 0; i < data.length; i++) {
        // new divs for each book
        const newBookDiv = document.createElement('div');
        const newBookTitle = document.createElement('div');
        newBookDiv.classList.add('book');
<<<<<<< HEAD:script.js
        // newBookDiv.id = data[i].id;
        // newBookDiv.innerHTML = data[i].title;
        newBookTitle.innerHTML = data[i].title;
        newBookTitle.classList.add('bookTitle');
        newBookTitle.id = data[i].id;
=======
        newBookDiv.id = data[i].id;
        // set book title
        newBookTitle.innerHTML = data[i].title;
        newBookTitle.classList.add('bookTitle');
        // add to DOM
>>>>>>> dc3a3233b32f70f36253133639745e6198393413:javascript/script.js
        allBooksSection.append(newBookDiv);
        newBookDiv.append(newBookTitle);
    } 
}
getAllBooks();


// get detailed info about a book
const getBookInfo = async () => {
    let res = await fetch(`https://myapi-profstream.herokuapp.com/api/f97dfc/books/${currentBookId}`);
    let bookInfo = await res.json();
    // hide index view and display detailed view
    allBooksSection.classList.add('hide')
    bookInfoSection.classList.remove('hide')
    editButtonsSection.classList.remove("hide")
    directory.innerHTML = `Details for ${bookInfo.title}`
    // get book cover image and add to DOM
    let displayImage = document.createElement('img');
    displayImage.src = bookInfo.image;
    bookInfoSection.append(displayImage);
    // get book info and add to DOM
    let infoList = document.createElement('dl');
    infoList.classList.add('book-info');
    bookInfoSection.append(infoList);

    // new book object
    currentBook = new CurrentBookInfo(bookInfo.title, bookInfo.author, bookInfo.release_date)
    // display detailed info about the book
    for (key in currentBook) {
        // Create DOM elements for each book property
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
        } else if (listItems.id === "released") {
            listDescription.innerHTML = bookInfo.release_date;
        }
        listItems.append(listDescription);
    }
}

// delete all
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
// display detailed view when a book is clicked
allBooksSection.addEventListener("click", (book) => {
    if(book.target.id){ 
    currentBookId = book.target.id;
    // console.log(currentBookId);
    getBookInfo();
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

deleteButton.addEventListener("click", () => {
    console.log('click');
    removeBook()
})