import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MovieGallery from "./components/MovieGallery";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import Footer from "./components/Footer";

export const MyContext = React.createContext();

export default function App() {
  const [mode, setMode] = useState({});
  const [movieDatabase, setMovieDatabase] = useState([]);
  const [movieIndex, setMovieIndex] = useState(null);

  const newMovie = (movie) => {
    const tmp = [...movieDatabase, movie];
    setMovieDatabase(tmp);
    localStorage.setItem("movieDatabase", JSON.stringify(tmp));
  };
  const updateMovie = (movie, index) => {
    let tmp = movieDatabase;
    tmp[index] = movie;
    setMovieDatabase(tmp);

    localStorage.setItem("movieDatabase", JSON.stringify(tmp));
  };
  const removeMovie = (index) => {
    let tmp = movieDatabase;
    tmp.splice(index, 1);
    setMovieDatabase(tmp);
    console.log(tmp);
    localStorage.setItem("movieDatabase", JSON.stringify(tmp));
  };

  useEffect(() => {
    const stored = localStorage.getItem("movieDatabase");

    if (stored) {
      setMovieDatabase(JSON.parse(stored));
    } else {
      initialDatabase();
    }
  }, []);

  const initialDatabase = () => {
    setMovieDatabase([
      {
        title: "Avengers",
        year: 2012,
        descrition:
          "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      },
      {
        title: "Avengers: Endgame",
        year: 2019,
        descrition:
          "After the devastating events of Avengers: Wojna bez granic (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
      },
      {
        title: "Avengers: Infinity War",
        year: 2018,
        descrition:
          "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
      },
    ]);
  };

  return (
    <MyContext.Provider value={{ movieDatabase, newMovie, updateMovie, removeMovie }}>
      <NavBar setMode={setMode} setMovieIndex={setMovieIndex} />

      {mode.length > 0 ? (
        <>
          {mode.length > 0 && mode === "MovieGallery" && (
            <MovieGallery movieIndex={movieIndex} setMovieIndex={setMovieIndex} />
          )}
          {mode.length > 0 && mode === "MovieList" && (
            <MovieList movieIndex={movieIndex} setMovieIndex={setMovieIndex} />
          )}
          {mode.length > 0 && mode === "AddMovie" && <AddMovie />}
        </>
      ) : (
        <div className="primaryContainer">
          Simple movie database app currently it is use user storage but it can be modified to use
          api and external database system like MongoDB.
        </div>
      )}

      <Footer />
    </MyContext.Provider>
  );
}
