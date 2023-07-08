// Book class 

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI class

class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book=> UI.addBookToList(book));
    }

    static addBookToList(book) {
        const tableBody = document.querySelector("#book-table-body");
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="delete">Delete</a></td>`
            ;
        tableBody.appendChild(row);
    }

    static deleteBook(element) {
        if(element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector("body");
        container.insertBefore(div, document.querySelector("h1"));
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
    }
}


// Store class

class Store {
    static getBooks() {
        let books;
        if(sessionStorage.getItem("books") === null){
            books =[];
        } else {
            books = JSON.parse(sessionStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        sessionStorage.setItem("books", JSON.stringify(books)); 
    }

    static removeBook(title) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.tltle === title){
                books.splice(index, 1);
            }
        });
        sessionStorage.setItem("books", JSON.stringify(books));
    }
}


// Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a book
document.querySelector("#add-book-form").addEventListener("submit",(e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#title').value;


    if (title === "" || author === "") {
        UI.showAlert("please fill in all fields", "error");
    } else {
        const book = new Book(title, author);

        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Book added successfully", "success");
        UI.clearFields();

    }
})


// Event: Remove a book
document.querySelector('#book-list').addEventListener("click",(e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    UI.showAlert("Book removed successsfully", "success")
});