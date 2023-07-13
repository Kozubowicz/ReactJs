import React from "react";

export default function Result(props) {
  let movieUrl = `http://www.imdb.com/title/${props.imdbID}`;
  return (
    <div className="result">
      <img src={props.Poster} alt="Poster" className="Poster" />
      <div className="des">
        <b>
          <i>{props.Title}</i>
        </b>
        Year: {props.Year}
        <br />
        Type: {props.Type.replace(/^\w/, (e) => e.toUpperCase())}
        <a href={movieUrl} className="link">
          IMDB
        </a>
      </div>
    </div>
  );
}
