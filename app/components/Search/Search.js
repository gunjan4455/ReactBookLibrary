import React from "react"
import {Link} from 'react-router-dom'
import Book from '../shared/Book'
import apiCall from '../commonApi/books';
import config from "../../config";
const {API: {protocols, domain, imagePath}} = config;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book : {},
            books: [],
            booksResult: [],
            searchKey: this.props.match.params.book,
            searchBook:''
        }
        this.filterBooks = this.filterBooks.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentWillMount() {
        Promise.resolve(apiCall())
            .then((res) => {
                if (res && res.length) {
                    let books = this.filterBooks(res);
                    if(books.length)
                        this.setState({books: books});
                }
            })
            .catch((err) => {
                console.log("err====",err);
            })
    }

    filterBooks(books){
        let updatedList = books;
        updatedList = updatedList.filter(function(book){
            return book.title.toLowerCase().search(this.state.searchKey) !== -1;
        }.bind(this));
        return updatedList;
    }

    renderBook(item, index) {
        return (
            <div className="col-md-3" key={index}>
                <Link to={`/details/${item.id}`}><Book book={item} id={index} key={index}/></Link>
            </div>
        )
    }

    onChangeHandler(ev) {
        this.setState({searchBook : ev.target.value});
    }

    render() {
        let books = this.state.books && this.state.books.length && this.state.books.map(this.renderBook);
        return (
            <section className="container bg-gray">
                <div className="wraper">
                    <div className="row">
                        <Link to='/'>
                            <div>
                                <img src={`${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}${imagePath}back_button.jpg`}
                                     className="back-button"/>
                            </div>
                        </Link>
                        <div className="col-sm-6 text-center">
                            <div>
                                <form>
                                    <input type='text' placeholder="search..." onChange={this.onChangeHandler} style={{ height: 37}}/>
                                           <span>
                                                <input type="reset" value="X" className="btn btn-default"/>
                                                <Link to={`/search/${this.state.searchBook}`}><button  className="btn btn-default" type="button">Go!</button></Link>
                                           </span>
                                </form>
                            </div>
                        </div>
                    </div>
                    {books.length && <div className="row" id="content">
                        {books}
                    </div>
                    }
                    {!books.length && <div>No result found</div>}
                </div>
            </section>
        )
    }
}

export default Search
