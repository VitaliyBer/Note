import React, {Component} from 'react'


export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.commentsAuthor = this.props.commentsAuthor;
        this.commentsText = this.props.commentsText;
        this.commentsDate = this.props.commentsDate;
    }

    render() {

        return (
            <div className="mt-4">
                <h5>Comments:</h5>
                <div className="row">
                    <p>{this.commentsText}</p>
                    <footer>
                        <div className="col-md-12">
                            <small>
                                <b>{this.commentsAuthor}</b>
                                <p> data: {this.commentsDate}</p>
                            </small>

                        </div>
                    </footer>


                </div>
            </div>
        )
    }
}