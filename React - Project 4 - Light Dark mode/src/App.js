import React from "react";
import NavBar from "./components/NavBar";
import PrimaryHeader from "./components/PrimaryHeader";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="BackgroundImage">
        <PrimaryHeader />
        <Footer />
      </div>
    </div>
  );
}
