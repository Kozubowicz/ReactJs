import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar({ setMode, setMovieIndex }) {
  return (
    <nav>
      <div className="PageTitle">
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" width={80} />
        </a>
        <h3 className="NavTile">Movie Database</h3>
      </div>
      <div className="ModeBar">
        <button
          onClick={() => {
            setMovieIndex(null);
            setMode("MovieGallery");
          }}
        >
          Movie Gallery
        </button>
        <button
          onClick={() => {
            setMovieIndex(null);
            setMode("MovieList");
          }}
        >
          Movie List
        </button>
        <button
          onClick={() => {
            setMovieIndex(null);
            setMode("AddMovie");
          }}
        >
          Add Movie
        </button>
      </div>
    </nav>
  );
}
