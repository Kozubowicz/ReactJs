import React from "react";
import NavBar from "./components/NavBar";
import PrimaryHeader from "./components/PrimaryHeader";
import SecondaryHeader from "./components/SecondaryHeader";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <PrimaryHeader />
      <SecondaryHeader />

      <footer>
        <hr />
        <small>@ 2023 All rights</small>
      </footer>
    </div>
  );
}
