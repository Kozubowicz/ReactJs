import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../App";

export default function AddMovie({ movieIndex, edit = false }) {
  const { movieDatabase, newMovie, updateMovie } = useContext(MyContext);

  const [poster, setPoster] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [descrition, setDes] = useState("");

  const Movie = () => {
    const movie = { poster, title, year, descrition };
    if (edit === true) {
      updateMovie(movie, movieIndex);
    } else {
      newMovie(movie);
      setPoster("");
      setTitle("");
      setYear("");
      setDes("");
    }
  };

  const editData = () => {
    setPoster(movieDatabase[movieIndex].poster);
    setTitle(movieDatabase[movieIndex].title);
    setYear(movieDatabase[movieIndex].year);
    setDes(movieDatabase[movieIndex].descrition);
  };
  useEffect(() => {
    if (edit === true) {
      editData();
    }
  }, []);
  return (
    <div className="movieDetails">
      <div className="movieData">
        <input
          type="text"
          placeholder="imgURL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          min="1900"
          max="2099"
          step="1"
          pattern="[0-9]{4}"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <textarea
          type="text"
          placeholder="Description"
          style={{ height: "250px" }}
          value={descrition}
          onChange={(e) => setDes(e.target.value)}
        />
        <br />

        <button onClick={() => Movie()}> {edit === true ? "Update Movie" : "Add Movie"}</button>
      </div>
    </div>
  );
}
