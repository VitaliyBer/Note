import React, {Component} from 'react'
import Note from './Note/Note'


export default class NoteList extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.notes)
        this.removeNote = this.removeNote.bind(this)
        this.editTask = this.editTask.bind(this)
        this.addComments = this.addComments.bind(this)


    }

    removeNote(noteId) {
        this.props.removeNote(noteId);
    }

    editTask(noteId, newNotes) {
        this.props.editTask(noteId, newNotes)
    }

    addComments(noteId, comments) {
        this.props.addComments(noteId, comments)
    }


    render() {
        const NoteCom = this.props.notes.map((note) => {
            return (

                <Note noteId={note.id}
                      key={note.id}
                      noteName={note.noteName}
                      noteContent={note.noteContent}
                      comments={note.comments}
                      removeNote={this.removeNote}
                      editTask={this.editTask}
                      addComments={this.addComments}

                />

            )

        })


        return (
            <div className="card">
                {NoteCom}
            </div>
        )
    }
}