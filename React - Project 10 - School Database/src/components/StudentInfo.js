import React, { useState } from "react";
import sortStudents from "./sortStudents";
import fetchData from "./featch";

export default function StudentInfo({ collections }) {
  const [selectedClass, setSelectedClass] = useState();
  const [studentData, setStudentData] = useState({});

  const handleClassSelect = (classSelected) => {
    setSelectedClass(classSelected);
    setStudentData({});
  };

  const handleStudentSelect = (studentSelected) => {
    fetchData("school/search/" + studentSelected)
      .then((data) => {
        setStudentData(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const studentInfo = (collections) => {
    const { classes, sortedKeys } = sortStudents(collections);

    return (
      <div className="secondaryContainer">
        <div>
          <label>
            <b>Class: </b>
          </label>
          <select onChange={(e) => handleClassSelect(e.target.value)}>
            <option></option>
            {sortedKeys.map((e) => (
              <option>{e}</option>
            ))}
          </select>
        </div>
        {selectedClass && (
          <div>
            <select onChange={(e) => handleStudentSelect(e.target.value)}>
              {classes[selectedClass].map((e) => (
                <option value={e._id}>
                  {e.name} {e.surname}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  const listGrades = (grades) => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Grades</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {grades[0].objArr.map((e) => {
              return (
                <tr>
                  <td>{e.grade}</td>
                  <td>{e.subject}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="primaryContainer">
      <div className="secondaryContainer">{studentInfo(collections[0].objArr)}</div>
      {studentData.length > 0 ? (
        listGrades(studentData)
      ) : (
        <div>Select student to know his grades...</div>
      )}
    </div>
  );
}
