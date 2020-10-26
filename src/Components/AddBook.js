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
        this.handelClick = this.handelClick.bind(this);
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

    handelClick(){
        const { name, author, price, imgurl } = this.state;
        this.props.onSubmit(name, author, price, imgurl);
        this.setState({
            name:'',
            author:'',
            price: '',
            imgurl: ''
        })
    }
   

    render() {
        const { name, author, price, imgurl } = this.state;
        return (
            <div className="addbook" >
                <h2>Book Information</h2>
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
                    <button className="btn btn-primary" onClick={this.handelClick}>{this.props.editData != null ? "Save" : "Add"}</button>
            </div>
        )
    }
}

export default AddBook;