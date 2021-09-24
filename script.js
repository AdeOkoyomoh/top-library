let myLibrary = [   

];

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
};

Book.prototype.buttonStatus = function(){
    if (this.hasBeenRead === true){
        return `Not Read`
    } else {
        return `Read`
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
    } else {
        return false;
    }
   };

function numberChecker(input){
    if (input * 1 == input){
        return input
    } else {
        return `Unspecified`
    }
}


function addBook(){
    let input1 = prompt("Title of the book?");
    let input2 = prompt("Who wrote it?");
    let input3 = prompt("How many pages does it have?");
    let input4 = checkYesOrNo(prompt("Have you finished it?"));

    addBookToLibrary(input1, input2, numberChecker(input3), input4);
}

function changeReadStatus(book){
    book.beenRead();
}

function removeBook(book){
    for (let i = 0; i < myLibrary.length; i++){
        if (book === myLibrary[i]){
            myLibrary.splice(i, 1);
        }
    }
    displayBooks();
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
        let newDivButton = document.createElement('button');
        newDivButton.textContent = `${myLibrary[i].buttonStatus()}`;
        newDivButton.classList.add('readButton');
        newDivButton.setAttribute('data-key', `${i}`);
        newDivButton.addEventListener('click', function(e){
            myLibrary[e.path[0].attributes[1].nodeValue].beenRead();
            displayBooks();
        });
        let removeButton = document.createElement('button');
        removeButton.textContent = `Remove Book`;
        removeButton.classList.add('remove-button');
        removeButton.setAttribute('data-key', `${i}`);
        removeButton.addEventListener('click', function(e){
            console.log(e);
            removeBook(myLibrary[e.path[0].attributes[1].nodeValue]);
            displayBooks();
        })

        console.log(newDiv);
        display.appendChild(newDiv);
        newDiv.appendChild(newDivHeader);
        newDiv.appendChild(newDivAuthor);
        newDiv.appendChild(newDivPages);
        newDiv.appendChild(newDivStatus);
        newDiv.appendChild(newDivButton);
        newDiv.appendChild(removeButton);

        newDiv.classList.add('book-tile');
        newDiv.setAttribute('data-key', `${i}`);
    };
};