import React from 'react';
import './App.css';
import BookList from './Components/BookList';
import AddBook from './Components/AddBook';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      editBook: null,
      bookList: [],
    }
    this.editBook = this.editBook.bind(this);
    this.getbooklist = this.getbooklist.bind(this);
    this.deletBook = this.deletBook.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  

  getbooklist() {
    fetch("http://localhost:5000/books/list")
      .then(response => response.json())
      .then(response => {
        this.setState({ bookList: response.data })
      });
  }

  deletBook(id){
    fetch(`http://localhost:5000/books/deletebook/${id}`, {
        method: 'DELETE',
    }).then(() =>  {
       let newdata = this.state.bookList.filter((item) => item._id !== id )
       this.setState({bookList : newdata});
    });
  }


  editBook(id) {
    fetch(`http://localhost:5000/books/edit/${id}`)
      .then(() => {
        let elementIndex = this.state.bookList.findIndex(item => item._id === id) 
        this.setState({ editBook: this.state.bookList[elementIndex] });
      });
  }; //Callback function for booklist edit button. Because we need data in AddBook comp to show in form.

  onSubmit(name, author, price, imgurl) {
    const book = {
        name,
        author,
        price,
        imgurl
    }//When we click on edit then only we got the editData so if our editData is null then we will call add item otherwise save item (save changes).
    if(this.state.editBook != null){
        fetch(`http://localhost:5000/books/update/book/${this.state.editBook._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then(() => {
      let elementIndex = this.state.bookList.findIndex(item => item._id === this.state.editBook._id);
      let newArray = [...this.state.bookList];
      newArray[elementIndex] = {...newArray[elementIndex], name: name, author:author, price:price, imgurl:imgurl}
      this.setState({bookList: newArray});
    }); 
    }
   else{
    fetch('http://localhost:5000/books/addbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then((response) => response.json())
    .then(response => {
      let bookList = [...this.state.bookList];
      bookList.push(response.data);
      this.setState({ bookList });
    } );
   }
}
  
  
  
  componentDidMount() {
    this.getbooklist();
  }


  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-6"><AddBook editData={this.state.editBook} onSubmit={this.onSubmit}/></div>
          <div className="col-6"><BookList editBook={this.editBook} deleteBook={this.deletBook} bookList={this.state.bookList} /></div>
        </div>
      </div>
    );
  }
}

export default App;
