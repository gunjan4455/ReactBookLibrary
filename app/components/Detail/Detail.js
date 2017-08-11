import React from "react";
import "styles/bootstrap.css";
import "styles/style.css";
import {Link} from 'react-router-dom'
import {getBookById, editBook} from "./api";
import DetailModal from "../shared/DetailModal";
import ConfirmationModal from "../shared/ConfirmationModal";
import config from "../../config";
const {API: {protocols, domain, imagePath}} = config;

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            showDetailModal: false,
            showConfirmation: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillMount() {
        Promise.resolve(getBookById(this.props.match.params.id))
            .then((res) => {
                if (res)
                    this.setState({book: res});
            })
            .catch((err) => {
                console.log("err====", err);
            })
    }

    closeModal() {
        this.setState({showDetailModal: false})
    }

    showInfo() {
        this.setState({showDetailModal: !this.state.showDetailModal})
    }

    onEdit(formData) {
        Promise.resolve(editBook(this.props.match.params.id, formData))
            .then((res) => {
                if (res)
                    this.setState({book: res, showDetailModal: false, showConfirmation: true});
                setTimeout(() => {
                    this.setState({showConfirmation: false});
                }, 2000);
            })
            .catch((err) => {
                console.log("err====", err);
            })
    }

    render() {
        return (
            <section className="container bg-gray">
                <div className="row">
                    <Link to='/'>
                        <div>
                            <img src={`${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}${imagePath}back_button.jpg`}
                                  className="back-button"/>
                        </div>
                    </Link>
                    <div className="col-md-4">
                        <div className="thumbnail">
                            <img className="cover"
                                 src={`${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}${imagePath}${this.state.book.imageUrl}`}/>
                        </div>
                    </div>
                    <div className="col-md-6 detail-mid-box">
                        <h3>{this.state.book.title}</h3>
                        <h5>By {this.state.book.author}</h5>

                        <p>{this.state.book.description}</p>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-default corner-bottom" onClick={this.showInfo}>
                            Edit
                        </button>
                    </div>
                    {this.state.showDetailModal &&
                    <DetailModal onHideModal={this.closeModal} book={this.state.book} onEdit={this.onEdit}/>
                    }
                    {this.state.showConfirmation &&
                    <ConfirmationModal message="Successfully edited" onHideModal={this.closeModal}/>
                    }
                </div>
            </section>
        )
    }
}

export default Detail
