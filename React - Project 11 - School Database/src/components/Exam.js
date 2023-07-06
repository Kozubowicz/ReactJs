// Function allowing to add grades from exam in selected class from specific subject

import React, { useState } from "react";
import sortStudents from "./sortStudents";

export default function Exam({ collections, teacherId }) {
  const [selectedValue, setSelectedValue] = useState();
  const [grades, setGrades] = useState([]);
  const [subject, setSubject] = useState();

  const [serwerAnswer, setSerwerAnswer] = useState(true);

  // Gather, filter and prepare data to send on server
  const handleSubmit = async () => {
    const filteredGrades = grades.filter((obj) => obj !== undefined);
    const updatedGrades = filteredGrades.map((obj) => ({
      ...obj,
      subject: subject,
      teacherId: teacherId,
    }));
    try {
      let answer = await sendDataToServer(updatedGrades);
      console.log(answer.success);
      if (answer.success === false) {
        setSerwerAnswer(false);
      } else {
        setSerwerAnswer(true);
        setGrades([]);
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  // Sending data to server
  const sendDataToServer = async (dataToSend) => {
    return fetch(`http://192.168.1.3:8080/api/Exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server answer:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Downloading name of subject
  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  // Putting grade to table
  const handleSelectChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    setGrades([]);
  };

  // Function to gather and update grades
  const handleInputValueChange = (index, studentId, grade) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = { studentId, grade };
    setGrades(updatedGrades);
  };

  // Function to select class and print list of student
  const classesList = (objArr) => {
    const { classes, sortedKeys } = sortStudents(objArr);

    return (
      <div>
        <div className="secondaryContainer">
          {/* Printing select with list of classes */}
          <div>
            <label>
              <b>Class: </b>
            </label>
            <select onChange={(e) => handleSelectChange(e.target.value)}>
              <option></option>
              {sortedKeys.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          {/* Printing field to put in nome of subject */}
          <div>
            <label>
              <b>Subject: </b>
            </label>
            <input type="text" onChange={(e) => handleSubjectChange(e.target.value)} />
          </div>
        </div>
        {/* Printing list of students with fields to put in grades*/}
        {selectedValue && (
          <div>
            <div>
              <table>
                <tbody>
                  {classes[selectedValue].map((option, index) => (
                    <tr key={option._id}>
                      <td>
                        {option.name} {option.surname}
                      </td>
                      <td>
                        <input
                          type="number"
                          key={option._id}
                          value={grades[index] ? grades[index].value : ""}
                          onChange={(e) =>
                            handleInputValueChange(index, option._id, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Printing send button and veryfication message after answer from server */}
            <div className="sendButtonContainer">
              <div id="failure" className={serwerAnswer ? "hidden" : "visibleRekordInputs"}>
                Something isn't right
              </div>
              <button type="submit" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <div className="primaryContainer">{classesList(collections[0].objArr)}</div>;
}
