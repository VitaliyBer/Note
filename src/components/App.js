import React, {Component} from 'react';
import {BD_CONFIG} from './Config/config';
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import fireBase from 'firebase/app'
import 'firebase/database'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [{
                id: 1, noteName: 'test static', noteContent: 'Hello Word',
                comments: [
                    {
                        id: 1,
                        commentsText: "interesting",
                        commentsAuthor: "Sasha",
                        commentsDate: '18.05.18'
                    },
                    {
                        id: 2,
                        commentsText: " Good",
                        commentsAuthor: "Vitalik",
                        commentsDate: '15.05.18'
                    }]

            },]

        }
        this.editTask = this.editTask.bind(this)
        this.addNote = this.addNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
        this.addComments = this.addComments.bind(this)

        if (!fireBase.apps.length) {
            this.app = fireBase.initializeApp(BD_CONFIG);
        }

        this.database = this.app.database().ref().child('notes')


    }

    componentWillMount() {
        localStorage.getItem('notes')
        console.log(this.state.notes)
        const newNotes = this.state.notes;
        this.database.on('child_added', snap => {

            newNotes.push({
                id: snap.key,
                noteContent: snap.val().noteContent,
                noteName: snap.val().noteName,


                comments: [{
                    id: snap.key,
                    commentsText: snap.val().commentsText,
                    commentsAuthor: snap.val().commentsAuthor,
                    commentsDate: snap.val().commentsDate
                }]


            })

            this.setState({

                notes: newNotes
            })
        })
        this.database.on('child_removed', snap => {
            for (let i = 0; i < newNotes.length; i++) {
                if (newNotes[i].id === snap.key) {
                    newNotes.splice(i, 1);
                }
            }
            this.setState({
                notes: newNotes
            })
        })
        this.database.on('child_changed', snap => {

            this.state.notes.forEach(note => {
                if (snap.key === note.id) {
                    note.id = snap.key;
                    note.noteContent = snap.val().noteContent;
                    note.noteName = snap.val().noteName;
                    note.comments = snap.val().comments

                }
            });
            this.setState({
                notes: this.state.notes,
            });
        });
    }


    componentDidUpdate() {
        localStorage.setItem('notes', JSON.stringify(this.state.notes))
        localStorage.setItem('notesDate', Date.now());

    }


    addNote(note) {
        if (note.value === 'fireBase') {
            this.database.push().set({
                noteName: note.newNoteName,
                noteContent: note.newNoteContent,
                comments: note.newNoteComments
            })
        } else {
            const newNote = {
                id: 7,
                noteName: note.newNoteName,
                noteContent: note.newNoteContent,
                comments: note.newNoteComments

            }

            if (localStorage.getItem('notes') == null) {
                let note = this.state.notes
                console.log(note)
                note.push(newNote);
                localStorage.setItem('notes', JSON.stringify(note));
            } else {
                let note = JSON.parse(localStorage.getItem('notes'));
                note.push(newNote);
                localStorage.setItem('notes', JSON.stringify(note));
            }

            this.setState({

                notes: JSON.parse(localStorage.getItem('notes'))
            })
        }


    }


    removeNote(noteId) {
        try {
            this.database.child(noteId).remove()
        } catch (e) {
            let note = JSON.parse(localStorage.getItem('notes'));
            note.splice(noteId, 1)
            this.setState({
                notes: note
            })

            localStorage.setItem('notes', JSON.stringify(note));
        }

    }

    editTask(id, data) {
        console.log(id, data)
        let ref = this.database;
        return ref
            .child(id)
            .update({
                noteContent: data.newNoteContent,
                noteName: data.newNoteName,
                comments: []
            })
            .then(() => ref.once('value'))
            .then(snapshot => snapshot.val())
            .catch(error => ({
                errorCode: error.code,
                ErrorMessage: error.message
            }));

    }

    addComments(noteId, comments) {
        this.database.child(comments).child("comments").push().set({

            commentsText: noteId.newCommentsText,
            commentsAuthor: noteId.newCommentsAuthor,
            commentsDate: noteId.newCommentsDate

        })
    }


    render() {


        return (
            <div>
                <h1 className="text-dark thead-dark">Create Note</h1>
                <NoteList notes={this.state.notes}
                          removeNote={this.removeNote}
                          editTask={this.editTask}
                          addComments={this.addComments}/>
                <div className="text-black-50">Notes: {this.state.notes.length} pcs</div>
                <NoteForm addNote={this.addNote}/>


            </div>
        );
    }
}

export default App;
