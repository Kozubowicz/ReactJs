import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ApiDes from "./components/ApiDes";
import AppDes from "./components/AppDes";

import AppRaw from "./components/AppRaw";

export default function App() {
  const [mode, setMode] = useState({});

  const modeHandler = (modeName) => {
    setMode(modeName);
  };
  return (
    <div className="App">
      <NavBar />
      <div className="primaryContainer">
        <h2>MongoDB Databases App</h2>
        This is an application designed to manage student information and grades using MongoDB as
        the database. The app provides various features such as login, sign in, sign out, and
        several other functionalities outlined below.
        <h2>Functionality: </h2>
        <ol>
          <li>
            Login and Sign Up: Users can log in or sign up to access the application. Upon
            successful login, the app checks if there is an ID stored to prevent automatic sign-out
            when the user hasn't explicitly chosen to do so.{" "}
          </li>
          <li>
            View Students by Class: Once logged in, the app presents students sorted in tables
            according to their respective classes. This feature allows users to easily browse
            through student information in an organized manner.
          </li>

          <li>
            {" "}
            Add Grades: Users can add grades from exams to every student belonging to a selected
            class. This functionality simplifies the process of recording and managing student
            grades, making it convenient for teachers or administrators.
          </li>

          <li>
            View Student Grades: Users have the option to view the grades of specific students. By
            selecting a student, the app presents their grades, providing a comprehensive overview
            of their academic performance.{" "}
          </li>

          <li>
            Database Operations: The app allows users to interact with the school's database by
            presenting all collections. Users can add new records to collections or remove existing
            ones. This feature enables efficient management of the school's database, providing
            flexibility in data handling.
          </li>
        </ol>
        <div>
          <br />
          <div className="functionsContainer">
            <button onClick={() => modeHandler("Api")}>Api code</button>
            <button onClick={() => modeHandler("App")}>App description</button>
            <button onClick={() => modeHandler("AppRaw")}>App raw code</button>
          </div>
        </div>
      </div>

      {mode.length > 0 && mode === "Api" && <ApiDes />}
      {mode.length > 0 && mode === "App" && <AppDes />}
      {mode.length > 0 && mode === "AppRaw" && <AppRaw />}
      <Footer />
    </div>
  );
}
