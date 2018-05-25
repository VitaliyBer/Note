import React, {Component} from 'react'


export default class NoteForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'fireBase',
            newNoteName: '',
            newNoteContent: '',
            newNoteComments: [{


                commentsText: "",
                commentsAuthor: "",
                commentsDate: ''


            }]
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleContentArea = this.handleContentArea.bind(this);
        this.writeNote = this.writeNote.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleNameInput(e) {
        this.setState({newNoteName: e.target.value});


    }

    handleContentArea(e) {
        this.setState({newNoteContent: e.target.value});


    }

    writeNote(e) {
        e.preventDefault();
        this.props.addNote(this.state)
        this.setState({
            newNoteName: '',
            newNoteContent: '',
            newNoteComments: []

        })

    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {

        return (
            <div className="container m-5">
                <h4 className="text-center text-black-50">The created note will be saved: {this.state.value}</h4>
                <div className="row">

                    <label className="text-black-50">Save as:
                        <select value={this.state.value} onChange={this.handleChange}
                                className="custom-select form-control">
                            <option value="fireBase">FireBase</option>
                            <option value="localStorage">LocalStorage</option>
                        </select>
                    </label>
                    <div className="col-4">
                        <label className="sr-only">Title:</label>
                        <input className="form-control"
                               type="text"
                               placeholder="Write title..."
                               value={this.state.newNoteName}
                               onChange={this.handleNameInput}


                        />

                        <label className="sr-only">Content: </label>
                        <textarea name="Text"
                                  className="form-control mt-3"
                                  id="" cols="80"
                                  rows="10"
                                  value={this.state.newNoteContent}
                                  onChange={this.handleContentArea}
                                  placeholder="Write content..."

                        />


                        <button className="btn btn-primary btn-block mt-5"
                                onClick={this.writeNote}
                                disabled={!this.state.newNoteName
                                ||
                                !this.state.newNoteContent}
                        >
                            Add note
                        </button>


                    </div>
                </div>
            </div>
        )
    }

}