import React from "react";
import config from '../../../config'
const { API: { protocols, domain , imagePath} } = config;

export default class Book extends React.Component {
    render() {
        return (
                <div className="col-md-12 col-sm-12">
                        <div className="thumbnail">
                            <img className="cover"
                                 src={`${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}${imagePath}${this.props.book.imageUrl}`}/>
                                <div className="hover">
                                <h3 className="text-center">{this.props.book.title}</h3>
                                <br/>
                            </div>
                        </div>
                        <div className="content bg-orange">
                            <h4/>
                            <p>
                                <b>Author : {this.props.book.author}</b>
                            </p>
                            <button type="button" className="btn btn-default btn-sm">Read More
                            </button>
                        </div>
                </div>
        )
    }
}


