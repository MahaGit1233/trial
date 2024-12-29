import React from "react";
import Movies from "./Movies";

const MoviesList = (props) => {
    return (
        <ul>
            {props.movies.map((movie) => (
                <Movies onDelMovie={props.onDelete} id={movie.id} key={movie.id} title={movie.title} releaseDate={movie.release} openingText={movie.openingText} />
            ))}
        </ul>
    );
};

export default MoviesList;