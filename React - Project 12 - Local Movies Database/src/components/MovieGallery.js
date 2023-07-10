import React, { useContext } from "react";
import { MyContext } from "../App";
import MovieDetails from "./MovieDetails";

export default function MovieGallery({ movieIndex, setMovieIndex }) {
  const { movieDatabase } = useContext(MyContext);

  return (
    <div className="container">
      {movieDatabase && movieDatabase.length > 0 ? (
        movieIndex === null && (
          <div className="galleryContainer">
            {movieDatabase.map((e, index) => (
              <div className="galleryWindow" key={e.title}>
                <img
                  src={e.poster}
                  width={200}
                  key={e.poster}
                  alt={e.title}
                  onClick={() => setMovieIndex(index)}
                />
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="primaryContainer">No movies in DataBase</div>
      )}

      {movieIndex !== null && (
        <MovieDetails movieIndex={movieIndex} setMovieIndex={setMovieIndex} />
      )}
    </div>
  );
}
