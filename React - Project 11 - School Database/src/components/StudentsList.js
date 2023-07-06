// Printing alphabetically list of students sorted by classes

import React from "react";
import sortStudents from "./sortStudents";

export default function StudentsList({ collections }) {
  const divideObjectsByClass = (objArr) => {
    const { classes, sortedKeys, attributeKeys } = sortStudents(objArr);

    const tables = sortedKeys.map((classValue) => (
      <div className="tableContainer">
        <table key={classValue}>
          <caption>Class: {classValue}</caption>
          <thead>
            <tr>
              {attributeKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes[classValue].map((obj, index) => (
              <tr key={index}>
                {attributeKeys.map((key) => (
                  <td key={key}>{obj[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));

    return tables;
  };

  return <div className="primaryContainer">{divideObjectsByClass(collections[0].objArr)}</div>;
}
