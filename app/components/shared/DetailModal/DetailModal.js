import React from "react";
import "styles/style.css";

export default class DetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;
        }
        formData.imageUrl = this.props.book.imageUrl;
        formData.id = this.props.book.id;
        this.props.onEdit(formData);
    }

    render() {
        return (
            <div className="modal-backdrop detail-modal-background">
                <button type="button" className="close-detail-modal close" data-dismiss="modal" aria-label="Close"
                        onClick={this.props.onHideModal}>
                    <span>&times;</span>
                </button>
                <form onSubmit={this.handleSubmit}>
                    <div className="col-sm-4 detail-modal">
                        <div className="detail_modal_heading"><b>EDIT BOOK</b></div>
                        <div>
                            <div className="form-group col-sm-12">
                                <label>Title:</label>
                                <input type="text" ref="title" className="form-control" placeholder="Title"
                                       defaultValue={this.props.book.title}/>
                            </div>
                            <div className="form-group col-sm-12">
                                <label>Description:</label>
                                <input type="text" ref="description" className="form-control" placeholder="Description"
                                       defaultValue={this.props.book.description}/>
                            </div>
                            <div className="form-group col-sm-12">
                                <label>Author:</label>
                                <input type="text" ref="author" className="form-control" placeholder="Author"
                                       defaultValue={this.props.book.author}/>
                            </div>
                        </div>
                        <div className="button_right">
                            <button type="submit" className="btn btn-default save_button"
                                    onClick={this.props.handleSubmit}>save
                            </button>
                            <button type="button" className="btn btn-default" onClick={this.props.onHideModal}>cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

