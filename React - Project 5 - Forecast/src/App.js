import React from "react";
import NavBar from "./components/NavBar";
import PrimaryHeader from "./components/PrimaryHeader";
import Logo from "./images/logo.png";

export default function App() {
  return (
    <div>
      <NavBar Logo={Logo} />
      <PrimaryHeader />

      <footer>
        <hr />
        <small>@ 2023</small>
      </footer>
    </div>
  );
}
