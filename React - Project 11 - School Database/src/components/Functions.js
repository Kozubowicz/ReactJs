// Printing buttons with primary functions of app

import React from "react";

export default function Functions({ mode }) {
  const setFunction = (name) => {
    mode(name);
  };

  return (
    <div className="functionsContainer">
      <button onClick={() => setFunction("Students_list")}>Students list</button>

      <button onClick={() => setFunction("Exam_data")}>Exam</button>

      <button onClick={() => setFunction("Student_Info")}>Student Info</button>

      <button onClick={() => setFunction("List_all_data")}>List all data</button>
    </div>
  );
}
