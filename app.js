// Just example
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () =>{
        console.log(title + " by" + " " + author + ", " + pages + ", " + read);
    } 
}

const theWicther = new Book('The Wicther', 'G.R Martin', 2000 , 'not read yet');
const harryPotter = new Book('Harry Potter', "j.k rollin", 1000 , "100000reader")
const onePunchMan = new Book('One Punch Man','ONE Sensei', 4000, "50million otaku" );


// ! Object Constructors
theWicther.info()
harryPotter.info()
onePunchMan.info()


// ! Object Prototype
Book.prototype.wantToRead = function(){
    console.log("I want to read " + this.title);
}

theWicther.wantToRead()
harryPotter.hasOwnProperty('valueOf');


