import React from 'react';
import './App.css';
import BookList from './Components/BookList';
import AddBook from './Components/AddBook';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      editBook : null
    }
    this.editBook = this.editBook.bind(this);
  }

  editBook(id){
    fetch(`http://localhost:4000/books/edit/${id}`)
    .then(response => response.json())
    .then(response =>{
          this.setState({editBook : response.data});
    });
}; //Callback function for booklist edit button. Because we need data in AddBook comp to show in form.
  
    render(){
      return (
        <div className="App">
            <div className="row">
                <div className="col-6"><AddBook editData={this.state.editBook}/></div>
                <div className="col-6"><BookList editBook = {this.editBook}/></div>
            </div>
        </div>
      );
    }
}

export default App;
