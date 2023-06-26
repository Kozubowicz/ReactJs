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
        This is a description page made for a web app using mongoDb database. It’s because it is
        problematic to set up an app, api for app and database to work with online. Purpose of this
        app is to present data from mongoDb databases, presenting collections as tables, and
        allowing adding/ removing single objects to the collection.
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
