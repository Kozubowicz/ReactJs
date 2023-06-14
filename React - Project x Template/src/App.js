import React from "react";
import NavBar from "./components/NavBar";
import PrimaryHeader from "./components/PrimaryHeader";
import SecondaryHeader from "./components/SecondaryHeader";
import Logo from "./images/Logo.png";

export default function App() {
  return (
    <div>
      <NavBar Logo={Logo} />
      <PrimaryHeader />
      <SecondaryHeader />

      <footer>
        <hr />
        <small>@ 2023 All rights</small>
      </footer>
    </div>
  );
}
