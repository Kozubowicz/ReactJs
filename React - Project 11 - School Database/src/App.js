import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Functions from "./components/Functions";
import fetchData from "./components/fetch";
import Table from "./components/Table";
import StudentsList from "./components/StudentsList";
import Exam from "./components/Exam";
import StudentInfo from "./components/StudentInfo";
import Login from "./components/LogIn";
import Footer from "./components/Footer";
import Form from "./components/Form";

export default function App() {
  const [mode, setMode] = useState("");
  const [collection, setCollection] = useState({});
  const [refreshData, setRefreshData] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [signUp, setSignUp] = useState(false);

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

  //Download user id from storage if exists
  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id != "undefined") {
      setTeacherId(id);
    }
  }, [setTeacherId]);

  //Save user id to storage
  useEffect(() => {
    localStorage.setItem("teacherId", teacherId);
  }, [teacherId]);

  //Set function
  const downloadMode = (name) => {
    setMode(name);
  };

  return (
    <div className="App">
      {/*Printing NavBar with butonn Sign in/ Sign out */}
      <NavBar
        setTeacherId={setTeacherId}
        teacherId={teacherId}
        setSignUp={setSignUp}
        signUp={signUp}
      />
      {/*Printing log in container if user isn't logged this mean there isn't id in storage*/}
      {!signUp && !teacherId && <Login setTeacherId={setTeacherId} />}
      {/*Printing log in container*/}
      {signUp && <Form setSignUp={setSignUp} signUp={signUp} />}
      {/*Printing buttons with app modes names */}
      {teacherId && <Functions mode={downloadMode} />}
      {/*Printing a collection as a table */}

      {teacherId && collection.length > 0 && mode === "Students_list" && (
        <StudentsList collections={collection} />
      )}
      {teacherId && collection.length > 0 && mode === "Exam_data" && (
        <Exam collections={collection} teacherId={teacherId} />
      )}
      {teacherId && collection.length > 0 && mode === "Student_Info" && (
        <StudentInfo collections={collection} />
      )}
      {teacherId && collection.length > 0 && mode === "List_all_data" && (
        <Table collections={collection} dataBase="school" setRefreshData={setRefreshData} />
      )}

      <Footer />
    </div>
  );
}
