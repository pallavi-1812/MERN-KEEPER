import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";

const CreateNote = (props) => {
  const [notes, setNotes] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    props.onAdd(notes);
    e.preventDefault();
    setNotes({
      title: "",
      content: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={notes.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          value={notes.content}
          cols="5"
          rows="10"
          onChange={handleChange}
        />
        <button type="submit">
          <b>
            <Plus className="plusBtn" />
          </b>
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
