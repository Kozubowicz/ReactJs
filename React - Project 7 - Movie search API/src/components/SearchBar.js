import React, { useState } from "react";

export default function SearchBar({ SearchList }) {
  const [inputValue, setInputValue] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      SearchList(data);
    } catch (error) {
      console.log("Błąd podczas pobierania danych:", error);
    }
  };
  const search = (e) => {
    if (e.key === "Enter" && inputValue.length > 0) {
      let url = `http://www.omdbapi.com/?apikey=c5d31a0f&s=${inputValue}`;
      fetchData(url);
    }
  };

  return (
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
  );
}
