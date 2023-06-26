import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Functions from "./components/Functions";
import fetchData from "./components/featch";
import Table from "./components/Table";
import StudentsList from "./components/StudentsList";
import Exam from "./components/Exam";
import StudentInfo from "./components/StudentInfo";
import Footer from "./components/Footer";

export default function App() {
  const [mode, setMode] = useState();
  const [collection, setCollection] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  //Downloading the collections from database
  useEffect(() => {
    if (mode) {
      fetchData("school/" + mode)
        .then((data) => {
          setCollection(data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [mode, refreshData]);

  const downloadMode = (name) => {
    setMode(name);
  };

  return (
    <div className="App">
      <NavBar />
      {/*Printing buttons with app modes names */}
      <Functions mode={downloadMode} />

      {/*Printing a collection as a table */}

      {collection.length > 0 && mode === "List_all_data" && (
        <Table collections={collection} dataBase="school" setRefreshData={setRefreshData} />
      )}

      {collection.length > 0 && mode === "Students_list" && (
        <StudentsList collections={collection} />
      )}
      {collection.length > 0 && mode === "Exam_data" && (
        <Exam collections={collection} teacherId="649851bbbd5d1f50250278ea" />
      )}
      {collection.length > 0 && mode === "Student_Info" && <StudentInfo collections={collection} />}

      <Footer />
    </div>
  );
}
