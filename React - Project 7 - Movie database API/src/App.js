import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

export default function App() {
  const [dataList, setDataList] = useState({});

  const handleSearch = (data) => {
    setDataList(data);
  };
  return (
    <div className="App">
      <NavBar />
      <SearchBar SearchList={handleSearch} />
      <SearchResults props={dataList} />
      {console.log(dataList)}
      <Footer />
    </div>
  );
}
