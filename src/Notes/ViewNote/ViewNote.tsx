import React from "react";
import {Note} from "../Note";
import './ViewNote.css';

interface Props {
    notes: Array<Note>
}

export const ViewNote = ({notes}: Props) => {

    const orderedNotes = notes.sort((a: Note, b: Note) => {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        return 0;
    })

    return (
        <>
            <div className='note-details-container'>
                {orderedNotes.map(note =>
                    <div key={note.text}>
                        <div className='date-info'>
                            <span>Erstellt am {new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className='date-info'>
                            <span>Zuletzt geändert am {new Date(note.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className='note-content'>
                            <span>{note.text}</span>
                        </div>
                    </div>
                )}
            </div>
        </>)
}