import React, { useState, useContext } from "react";
import { MyContext } from "../App";
import MovieDetails from "./MovieDetails";
import AddMovie from "./AddMovie";

export default function MovieList({ movieIndex, setMovieIndex }) {
  const { movieDatabase, removeMovie } = useContext(MyContext);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);

  const remove = (index) => {
    removeMovie(index);
    setRefresh(!refresh);
  };

  return (
    <div className="container">
      {movieDatabase && movieDatabase.length > 0 ? (
        movieIndex === null ? (
          <div className="listContainer">
            {movieDatabase.map((e, index) => (
              <div className="listElement" key={index}>
                <div
                  className="element"
                  onClick={() => {
                    setEdit(false);
                    setMovieIndex(index);
                  }}
                >
                  <h3>
                    {e.title} ({e.year})
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setEdit(true);
                    setMovieIndex(index);
                  }}
                >
                  Edit
                </button>
                <button className="removeButton" onClick={() => remove(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
        ) : edit ? (
          <AddMovie movieIndex={movieIndex} edit={true} />
        ) : (
          <MovieDetails movieIndex={movieIndex} setMovieIndex={setMovieIndex} />
        )
      ) : (
        <div className="primaryContainer">No movies in DataBase</div>
      )}
    </div>
  );
}
