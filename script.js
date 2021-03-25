
//HTML elements
const allBooksButton = document.querySelector("#all");
const createNewButton = document.querySelector("#create");
const allBooksSection = document.querySelector("#books");
const bookInfoSection = document.querySelector(".current-book");
const directory = document.querySelector("#directory");
const editButtonsSection = document.querySelector(".edit-buttons")
const deleteButton = document.querySelector(".delete");
const editButton = document.querySelector('.edit');


console.log(editButtonsSection);

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
const getAllBooks = async () => {
    let res = await fetch('https://myapi-profstream.herokuapp.com/api/f97dfc/books');
    let data = await res.json();
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        const newBookDiv = document.createElement('div');
        const newBookTitle = document.createElement('div');
        newBookDiv.classList.add('book');
        newBookDiv.id = data[i].id;
        // newBookDiv.innerHTML = data[i].title;
        newBookTitle.innerHTML = data[i].title;
        newBookTitle.classList.add('bookTitle');
        allBooksSection.append(newBookDiv);
        newBookDiv.append(newBookTitle);
    } 
}
getAllBooks();



const getBookInfo = async () => {
    let res = await fetch(`https://myapi-profstream.herokuapp.com/api/f97dfc/books/${currentBookId}`);
    let bookInfo = await res.json();
    allBooksSection.classList.add('hide')
    bookInfoSection.classList.remove('hide')
    editButtonsSection.classList.remove("hide")
    directory.innerHTML = `Details for ${bookInfo.title}`
    let displayImage = document.createElement('img');
    displayImage.src = bookInfo.image;
    bookInfoSection.append(displayImage);
    let infoList = document.createElement('dl');
    infoList.classList.add('book-info');
    bookInfoSection.append(infoList);
    currentBook = new CurrentBookInfo(bookInfo.title, bookInfo.author, bookInfo.release_date)
    for (key in currentBook) {
        let listItemName = key.charAt(0).toUpperCase() + key.slice(1);
        let listItems = document.createElement('dt');
        let listDescription = document.createElement('dd');
        listItems.id = key;
        listItems.innerHTML = `${listItemName}:`;
        infoList.append(listItems);
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


const removeAllChildren = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const removeBook = async () =>{
    let res = await fetch(`https://myapi-profstream.herokuapp.com/api/f97dfc/books/${currentBookId}`,
    {
         method: 'delete'
        });
        location.reload()
        return res
    }


//EVENT LISTENERS
allBooksSection.addEventListener("click", (book) => {
    currentBookId = book.target.id;
    // console.log(currentBookId);
    getBookInfo();
})

allBooksButton.addEventListener("click", () => {
    removeAllChildren(bookInfoSection);
    bookInfoSection.classList.add('hide');
    allBooksSection.classList.remove('hide');
    editButtonsSection.classList.add('hide')
    directory.innerHTML = "Index of All Books"
    
})

deleteButton.addEventListener("click", ()=>{
    console.log('click');
    removeBook()
})



