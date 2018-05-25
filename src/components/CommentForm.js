import React, {Component} from 'react'


export default class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newCommentsAuthor: '',
            newCommentsText: '',
            newCommentsDate: this.formatDate(new Date()),

        };
        this.handleAuthorInput = this.handleAuthorInput.bind(this)
        this.handleCommentsText = this.handleCommentsText.bind(this)
        this.writeComments = this.writeComments.bind(this)
        this.formatDate = this.formatDate.bind(this)

    }


    handleAuthorInput(e) {
        this.setState({newCommentsAuthor: e.target.value});


    }

    handleCommentsText(e) {
        this.setState({newCommentsText: e.target.value});


    }

    writeComments(e) {

        e.preventDefault();
        this.props.addComments(this.state)
        this.setState({
            newCommentsAuthor: '',
            newCommentsText: '',
            newCommentsDate: ''
        })
    }

    formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    render() {
        const {newCommentsText, newCommentsAuthor} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="form-group">
                        <div className="col-6">
                            <label className="sr-only">Author: </label>
                            <input className="form-control"
                                   placeholder="Write Name"
                                   value={newCommentsAuthor}
                                   onChange={this.handleAuthorInput}

                            />

                            <label className="sr-only">Comments:</label>
                            <textarea name="Text"
                                      placeholder="Write comments..."
                                      className="form-control mt-3"
                                      id="" cols="50"
                                      rows="3"
                                      value={newCommentsText}
                                      onChange={this.handleCommentsText}
                            />

                            <button className="btn btn-dark m-5"
                                    onClick={this.writeComments}
                                    disabled={!this.state.newCommentsAuthor
                                    ||
                                    !this.state.newCommentsText}
                            >
                                Add comment
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        )
    }

}