import React, {Component} from 'react'
import Comments from './Comments'


export default class CommentsList extends Component {
    constructor(props) {
        super(props)

        this.addComments = this.addComments.bind(this)
    }

    addComments(commentsId, newComments) {
        this.props.addComments(commentsId, newComments)
    }

    render() {
        return (
            <div>
                {
                    this.props.comments.map((comment) => {
                        return (
                            <Comments key={comment.id}
                                      commentsId={comment.id}
                                      commentsAuthor={comment.commentsAuthor}
                                      commentsDate={comment.commentsDate}
                                      commentsText={comment.commentsText}
                                      addComments={this.addComments}
                            />

                        )
                    })
                }


            </div>
        )
    }
}