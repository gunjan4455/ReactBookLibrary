import React from "react"
import Book from '../shared/Book'
import apiCall from '../commonApi/books';
import {Link} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            start: 0,
            end: 0,
            noOfBooks: 0,
            realBooks: [],
            hasMore: true,
            searchKey: '',
            noResultFound: false
        };
        this.generateBooks = this.generateBooks.bind(this);
        this.filterBooks = this.filterBooks.bind(this);
        this.renderBook = this.renderBook.bind(this);
        this.refresh = this.refresh.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillMount() {
        Promise.resolve(apiCall())
            .then((res) => {
                if (res && res.length) {
                    let books = [];
                    for (let i = 0; i < 5; i++) {
                        books.push(res[i])
                    }
                    this.setState({books: books, noOfBooks: res.length, realBooks: res})
                }
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    renderBook(item, index) {
        return (
            <div className="col-md-3" key={`${item.id}${index}`}>
                <Link to={`details/${item.id}`} id={`${index}${item.id}${index}`}><Book book={item} key={index}/></Link>
            </div>

        )
    }

    generateBooks() {
        if (this.state.books.length > this.state.realBooks.length)
            this.setState({hasMore: false});
        else {
            let moreBooks = [];
            for (let i = this.state.start; i < this.state.end; i++) {
                moreBooks.push(
                    this.state.realBooks[i]
                );
            }
            setTimeout(() => {
                this.setState({
                    books: this.state.books.concat(moreBooks),
                    start: this.state.books.length,
                    end: this.state.books.length + 6
                });
            }, 500);
        }
    }

    refresh() {
        if (this.state.books.length > this.state.realBooks.length)
            this.setState({hasMore: false});
        return this.state.books;
    }

    filterBooks(event) {
        var updatedList = this.state.realBooks;
        updatedList = updatedList.filter(function (book) {
            return book.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        //if (updatedList.length) {
        //    this.setState({noResultFound: true});
        //} else {
            this.setState({books: updatedList, searchKey: event.target.value.toLowerCase()});
       // }

    }

    reset() {
        this.setState({books: this.state.realBooks});
    }

    render() {
        let books = this.state.books && this.state.books.length && this.state.books.map(this.renderBook); //later from props
        return (
            <div>

                <section className="container bg-gray">
                    <div className="wraper">
                        <div className="row">
                            <div className="col-sm-6 text-center">
                                <div>
                                    <form>
                                        <input type='text' placeholder="search..." onChange={this.filterBooks}
                                               style={{ height: 37}}/>
                                               <span>
                                                    <input type="reset" value="X" className="btn btn-default" onClick={this.reset}/>
                                                    <Link to={`/search/${this.state.searchKey}`}>
                                                        <button className="btn btn-default" type="button">Go!</button>
                                                    </Link>
                                               </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {books.length &&
                        <InfiniteScroll
                            refreshFunction={this.refresh}
                            next={this.generateBooks}
                            hasMore={this.state.hasMore}
                            loader={this.state.hasMore && <h4>Loading...</h4>}
                            endMessage={<p style={{textAlign:'center'}}><b>Yay! You have seen it all</b></p>}>
                            <div className="row" id="content">
                                {books}
                            </div>
                        </InfiniteScroll>
                        }
                        {!books.length && <div>No result found</div>}
                    </div>
                </section>

            </div>
                    )
                }
                }

                export default Home
