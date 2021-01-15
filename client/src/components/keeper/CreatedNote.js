import React from 'react';
import { Trash } from 'react-bootstrap-icons';

const CreatedNote = (props) => {
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => {
                props.onDelete(props.id)
            }} ><Trash className="trashBtn" /></button>
        </div>
    );
}

export default CreatedNote;