import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNote from './CreateNote';
import CreatedNote from './CreatedNote';
import { Container } from 'reactstrap';

const Keeper = () => {

    const [notesArray, setNotesArray] = useState([]);

    useEffect(() => {
        requestNotes();
    }, []);

    const requestNotes = async () => {
        await axios
            .get("http://localhost:5000/", {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            })
            .then((res) => {
                setNotesArray(res.data);
            })
            .catch((error) => {
                console.error("error: ", error);
            });
    };

    const addNote = async (note) => {
        await axios
            .post("http://localhost:5000/", note, {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            })
            .then((res) =>
                setNotesArray((prevData) => {
                    return [...prevData, res.data];
                })
            )
            .catch((err) => console.log(err));
    }

    const deleteNote = (id) => {
        axios
            .delete(`http://localhost:5000/${id}`, {
                headers: { "x-auth-token": localStorage.getItem("auth-token") },
            })
            .then((res) => {
                setNotesArray((prevData) => {
                    return prevData.filter((data) => {
                        return data._id !== id;
                    });
                });
            });
    }

    return (
        <Container>
            <CreateNote onAdd={addNote} />
            {notesArray.map((note, index) => {
                return (
                    <CreatedNote
                        key={index}
                        id={note._id}
                        title={note.title}
                        content={note.content}
                        onDelete={deleteNote}
                    />
                )
            })}
        </Container>
    );
}

export default Keeper;