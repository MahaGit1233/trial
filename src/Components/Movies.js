import React from "react";

const Movies = (props) => {
    return (
        <li style={{ listStyleType: "none", borderBottom: "2px solid black", marginLeft: "25%", marginRight: "25%", marginBottom: "1rem" }}>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.openingText}</p>
            <div style={{ paddingBottom: "10px" }}>
                <button onClick={()=>props.onDelMovie(props.id)}>Delete Movie</button>
            </div>
        </li>
    )
}

export default Movies;