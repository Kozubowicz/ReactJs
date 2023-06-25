import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import fetchData from "./components/featch";
import ListDB from "./components/ListDB";
import Table from "./components/Table";
import Footer from "./components/Footer";

export default function App() {
  const [dataBasesList, setSataBasesList] = useState({});
  const [dataBase, setDataBase] = useState();
  const [collection, setCollection] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  //Downloading the list of databases at start-up application
  useEffect(() => {
    fetchData("databases")
      .then((data) => {
        setSataBasesList(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  //Set database name to download collections
  const downloadDataBase = (name) => {
    setDataBase(name);
  };

  //Downloading the collections from database
  useEffect(() => {
    if (dataBase) {
      fetchData(`dataBase/${dataBase}`)
        .then((data) => {
          setCollection(data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [dataBase, refreshData]);

  return (
    <div className="App">
      <NavBar />

      {/*Printing buttons with databases names */}
      {dataBasesList.length > 0 ? (
        <ListDB bases={dataBasesList} dataBaseName={downloadDataBase} />
      ) : (
        <div className="loadContainer">Loading data....</div>
      )}

      {/*Printing a collection as a table */}
      {collection.length > 0 ? (
        <Table collections={collection} dataBase={dataBase} setRefreshData={setRefreshData} />
      ) : (
        <div className="loadContainer">Choose database to download data</div>
      )}

      <Footer />
    </div>
  );
}
