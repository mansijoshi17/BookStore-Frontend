import React, { Component } from 'react';

class BookList extends Component {

    constructor() {
        super();
        this.state = {
            bookList: [],
        }
        this.deletBook = this.deletBook.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:5000/books/list")
            .then(response => response.json())
            .then(response =>{
                  this.setState({ bookList: response.data })
            });
    }

    deletBook(id){
        fetch(`http://localhost:5000/books/deletebook/${id}`, {
            method: 'DELETE',
        }).then(() => console.log('Book created'));
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.state.bookList.map((book) => {
                        return <li className="list-group-item"><div className="media" key={book.id}>
                            <img src={book.imgurl} width="100px" className="mr-3" alt="..." />
                            <div className="media-body">
                                <h4 className="mt-0">{book.name}</h4>
                                <h5>Author: {book.author}</h5>
                                <p>Price: {book.price}</p>
                            </div>
                            <div className="row"> 
                              <div className="col-6">
                              <button type="submit" className="btn btn-success" onClick={() => this.props.editBook(book._id)}>EDIT</button>
                              </div>
                              <div className="col-6">
                              <button type="submit" className="btn btn-danger" onClick={() => this.deletBook(book._id)}>DELETE</button>
                              </div>
                            </div>
                        </div>
                        </li>
                    }
                    )}
                </ul>
            </div>
        )
    }
}

export default BookList;