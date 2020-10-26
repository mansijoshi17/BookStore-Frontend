import React from 'react';

class AddBook extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            author: '',
            price: '',
            imgurl: ''
        }

        this.handelChange = this.handelChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (this.props.editData != null && previousProps.editData !== this.props.editData) {
            this.setState({
                name: this.props.editData.name,
                author: this.props.editData.author,
                price: this.props.editData.price,
                imgurl: this.props.editData.imgurl
            })
        } //For add the value of form fields while edit details.
    }

    handelChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    onSubmit(event) {
        event.preventDefault();
        const { name, author, price, imgurl } = this.state;
        const book = {
            name,
            author,
            price,
            imgurl
        }
        //When we click on edit then only we got the editData so if our editData is null then we will call add item otherwise save item (save changes).
        if(this.props.editData != null){
            fetch(`http://localhost:5000/books/update/book/${this.props.editData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }).then(() => console.log('Book updated')); 
        }
       else{
        fetch('http://localhost:5000/books/addbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }).then(() => console.log('Book created'));
       }
    }

    render() {
        const { name, author, price, imgurl } = this.state;
        return (
            <div className="addbook" >
                <h2>Book Information</h2>
                <form id="contact-form">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" value={name} onChange={this.handelChange} name="name" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Author</label>
                        <input type="text" className="form-control" value={author} onChange={this.handelChange} name="author" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Price</label>
                        <input type="text" className="form-control" value={price} onChange={this.handelChange} name="price" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Book Image Url</label>
                        <input type="text" className="form-control" value={imgurl} onChange={this.handelChange} name="imgurl" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>{this.props.editData != null ? "Save" : "Add"}</button>
                </form>
            </div>
        )
    }
}

export default AddBook;