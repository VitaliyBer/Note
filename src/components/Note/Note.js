import React, {Component} from 'react'
import CommentsList from '../CommentsList'
import CommentForm from '../CommentForm'
import './Note.css'

export default class Note extends Component {
    constructor(props) {
        super(props)
        this.noteId = props.noteId;
        this.handleRemoveNote = this.handleRemoveNote.bind(this)
        this.handleEditNote = this.handleEditNote.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderItem = this.renderItem.bind(this)
        this.toggleState = this.toggleState.bind(this)
        this.updateItem = this.updateItem.bind(this)
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleContentArea = this.handleContentArea.bind(this);
        this.addComments = this.addComments.bind(this)
        this.state = {
            isEditing: false,
            isAddComment: false,
            newNoteName: '',
            newNoteContent: '',
            newNoteComments: [{


                commentsText: "",
                commentsAuthor: "",
                commentsDate: ''


            }]
        }

    }

    addComments(comment) {
        this.props.addComments(comment, this.noteId)
    }


    handleNameInput(e) {
        this.setState({newNoteName: e.target.value});


    }

    handleContentArea(e) {
        this.setState({newNoteContent: e.target.value});


    }


    toggleState() {
        const {isEditing} = this.state;
        this.setState({
            isEditing: !isEditing
        })
    }


    handleRemoveNote(id) {
        this.props.removeNote(id);
    }

    handleEditNote(id) {
        this.props.editNote(id);
    }

    renderForm() {
        return (
            <form onSubmit={this.updateItem} className="mt-5">
                <input type="text"
                       className="form-control"
                       defaultValue={this.props.noteName}
                       onChange={this.handleNameInput}
                />
                <textarea type="text"
                          className="form-control mt-3"
                          defaultValue={this.props.noteContent}
                          onChange={this.handleContentArea}
                />
                <button
                    type="submit"
                    className="btn btn-dark btn-block mt-5"
                >Update Item
                </button>
            </form>
        )
    }

    updateItem(e) {
        e.preventDefault()
        this.props.editTask(this.props.noteId, this.state)
        this.toggleState()

    }

    renderItem() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-4 col-sm-2 col-xl-12 mt-5">
                        <p className="card-title text-left text-lg-center text-uppercase card-text"> {this.props.noteName}</p>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xl-12 ">
                        <h3 className="text-hide">Content:</h3>
                        <div className="note fade-in note-hover ">
                    <span className="close_btn"
                          onClick={(e) => {
                              e.stopPropagation()
                              this.handleRemoveNote(this.noteId)
                          }}>
                    &times;
                    </span>
                            <span className="edit_btn"
                                  onClick={(e) => {
                                      e.stopPropagation(e)
                                      this.toggleState()
                                  }}>

                    </span>
                            <p className="card-body comment-text"> {this.props.noteContent} </p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-2 col-xl-12">
                        <CommentsList comments={this.props.comments}/>
                        <CommentForm addComments={this.addComments}/>

                    </div>


                </div>
            </div>
        )
    }


    render() {
        const {isEditing} = this.state;

        return (
            <section>


                {

                    isEditing ? this.renderForm() : this.renderItem()
                }

            </section>
        )
    }
}