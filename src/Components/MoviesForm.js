import React, { useState } from "react";
import "./MoviesForm.css";

const MoviesForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredText, setEnteredText] = useState("");
    const [enteredDate, setEnteredDate] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const textChangeHandler = (event) => {
        setEnteredText(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const movieData = {
            title: enteredTitle,
            openingText: enteredText,
            releaseDate: enteredDate,
        };
        props.onSaveData(movieData);
        setEnteredTitle("");
        setEnteredText("");
        setEnteredDate("");
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="movieform">
                <div className="formdata">
                    <label htmlFor='formtitle'>Title:</label>
                    <input id='formtitle' value={enteredTitle} type='text' onChange={titleChangeHandler} />
                </div>
                <div className="formdata">
                    <label htmlFor='formtext'>Opening Text:</label>
                    <input id='formtext' value={enteredText} type='text' onChange={textChangeHandler} />
                </div>
                <div className="formdata">
                    <label htmlFor='formdate'>Release date:</label>
                    <input id='formdate' value={enteredDate} type='date' onChange={dateChangeHandler} />
                </div>
                <div className="formbutton">
                    <button>Add Movie</button>
                </div>
            </div>
        </form>
    )
}

export default MoviesForm;