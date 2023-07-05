import React, { useState } from "react";
import sortStudents from "./sortStudents";

export default function Exam({ collections, teacherId }) {
  const [selectedValue, setSelectedValue] = useState();
  const [grades, setGrades] = useState([]);
  const [subject, setSubject] = useState();

  const [serwerAnswer, setSerwerAnswer] = useState(true);

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

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  const handleSelectChange = (selectedValue) => {
    setSelectedValue(selectedValue);
    setGrades([]);
  };

  const handleInputValueChange = (index, studentId, grade) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = { studentId, grade };
    setGrades(updatedGrades);
  };

  const handleSubmit = async (e) => {
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

  const classesList = (objArr) => {
    const { classes, sortedKeys } = sortStudents(objArr);

    return (
      <div>
        <div className="secondaryContainer">
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
          <div>
            <label>
              <b>Subject: </b>
            </label>
            <input type="text" onChange={(e) => handleSubjectChange(e.target.value)} />
          </div>
        </div>
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
