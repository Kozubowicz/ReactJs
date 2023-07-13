import React from "react";
import Result from "./Result";

export default function SearchResults({ props }) {
  if (props.Response === "True") {
    return (
      <div className="searchResults">
        {props.Search.map((element, key) => {
          return (
            <Result
              key={key}
              Poster={element.Poster}
              Title={element.Title}
              imdbID={element.imdbID}
              Year={element.Year}
              Type={element.Type}
            />
          );
        })}
      </div>
    );
  } else if (props.Response === "False") {
    return (
      <div className="message">
        It's something wrong <br />
        Error: {props.Error}
      </div>
    );
  } else {
    return <div className="message">Type something</div>;
  }
}
