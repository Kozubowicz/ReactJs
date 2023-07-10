import React, { useState, useContext } from "react";
import { MyContext } from "../App";
import AddMovie from "./AddMovie";

export default function MovieDetails({ movieIndex, setMovieIndex }) {
  //const [refresh, setRefresh] = useState("");
  const remove = (index) => {
    removeMovie(index);
    //setRefresh(!refresh);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };
  const { movieDatabase, removeMovie } = useContext(MyContext);
  const [edit, setEdit] = useState("");
  return (
    <div className="movieDetails">
      {edit !== true ? (
        <>
          <div className="posterContiner">
            <img
              src={movieDatabase[movieIndex].poster}
              height={300}
              alt={movieDatabase[movieIndex].title}
            />
            <button onClick={() => handleEdit()}>Edit</button>
            <button
              className="removeButton"
              onClick={() => {
                remove(movieIndex);
                setMovieIndex(null);
              }}
            >
              X
            </button>
          </div>
          <div className="movieData">
            <h2>
              {movieDatabase[movieIndex].title} ({movieDatabase[movieIndex].year})
            </h2>
            <br />
            <br />
            Description:
            <br />
            <br />
            {movieDatabase[movieIndex].descrition}
          </div>
        </>
      ) : (
        <AddMovie movieIndex={movieIndex} edit={true} />
      )}
    </div>
  );
}
