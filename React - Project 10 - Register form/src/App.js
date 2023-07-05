import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Footer from "./components/Footer";

export default function App() {
  const [filledForm, setFilledForm] = useState("");
  return (
    <div className="App">
      <NavBar />
      <Form setFilledForm={setFilledForm} />
      {filledForm && (
        <div className="dataContainer">
          <p>Name: {filledForm.name}</p>
          <p>E-mail: {filledForm.email}</p>
          <p>Password: {filledForm.password}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}
