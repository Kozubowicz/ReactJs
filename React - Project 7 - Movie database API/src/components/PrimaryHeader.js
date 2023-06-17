import React, { useState } from "react";

import SecondaryHeader from "./SecondaryHeader";

export default function PrimaryHeader() {
  const [inputValue, setInputValue] = useState();
  const [searchList, setSearchList] = useState({});

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchList(data);
      console.log(data);
    } catch (error) {
      console.log("Błąd podczas pobierania danych:", error);
    }
  };

  const search = (e) => {
    if (e.key === "Enter" && inputValue.length > 0) {
      console.log(inputValue.length);
      let url = `http://www.omdbapi.com/?apikey=c5d31a0f&s=${inputValue}`;
      fetchData(url);
    }
  };

  return (
    <div className="PrimaryHeader">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Movie title"
          className="searchField"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={search}
        />
      </div>
      <div className="gallery">
        {searchList &&
          searchList.Search &&
          searchList.Search.map((element, key) => {
            return (
              <SecondaryHeader
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
    </div>
  );
}
