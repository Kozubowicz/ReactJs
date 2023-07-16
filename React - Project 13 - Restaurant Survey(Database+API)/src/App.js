import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Survey from "./components/Survey";
import Footer from "./components/Footer";

import NewRestaurant from "./components/NewRestaurant";

export default function App() {
  const [mode, setMode] = useState(true);
  return (
    <div className="App">
      <NavBar mode={mode} setMode={setMode} />

      {mode === true ? <Survey /> : <NewRestaurant />}

      <Footer />
    </div>
  );
}
