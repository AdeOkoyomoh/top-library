let myLibrary = [   

];

let initializedNumber = 0;

function Book(title, author, pages, hasBeenRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

Book.prototype.beenRead = function(){
    if (this.hasBeenRead === true){
        this.hasBeenRead = false;
    } else {
        this.hasBeenRead = true;
    }
};

Book.prototype.statusDisplay = function(){
    if (this.hasBeenRead === true){
        return `Finished`;
    } else {
        return `Not Yet Finished`
    }
}

function addBookToLibrary(title, author, pages, hasBeenRead){
    let book = new Book(title, author, pages, hasBeenRead);
    myLibrary.push(book);
    displayBooks();
}

let display = document.getElementById("main-display");

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clearDisplay(){
    removeAllChildNodes(display);
}

function checkYesOrNo(input){
    if (input.toLowerCase() === 'yes'){
        return true
    } else if (input.toLowerCase() === 'no') {
        return false
    }
   };


function addBook(){
    let input1 = prompt("Title of the book?");
    let input2 = prompt("Who wrote it?");
    let input3 = prompt("How many pages does it have?");
    let input4 = checkYesOrNo(prompt("Have you finished it?"));

    addBookToLibrary(input1, input2, input3, input4);
}

let addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addBook);

function displayBooks(){

    clearDisplay();

    for (let i = 0; i < myLibrary.length; i++){
        let newDiv = document.createElement('div');
        let newDivHeader = document.createElement('h2');
        newDivHeader.textContent = `${myLibrary[i].title}`;
        let newDivAuthor = document.createElement('p');
        newDivAuthor.setAttribute('class', 'author');
        newDivAuthor.textContent = `${myLibrary[i].author}`;
        let newDivPages = document.createElement('p');
        newDivPages.textContent = `${myLibrary[i].pages} pages`;
        let newDivStatus = document.createElement('p');
        newDivStatus.textContent = `${myLibrary[i].statusDisplay()}`;

        console.log(newDiv);
        display.appendChild(newDiv);
        newDiv.appendChild(newDivHeader);
        newDiv.appendChild(newDivAuthor);
        newDiv.appendChild(newDivPages);
        newDiv.appendChild(newDivStatus);

        newDiv.classList.add('book-tile');
    };
};
