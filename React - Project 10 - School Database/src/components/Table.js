import React, { useState } from "react";

export default function Expenses({ collections, dataBase, setRefreshData }) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (name, value, tableName) => {
    setInputValues((prevState) => {
      const newState = { ...prevState };
      if (!newState[tableName]) {
        newState[tableName] = {};
      }
      newState[tableName][name] = value;
      return newState;
    });
  };

  // Hiding and unhiding inputs to add new record
  const [hiddenClasses, setHiddenClasses] = useState({});
  const [serwerAnswer, setSerwerAnswer] = useState(true);

  const toggleHiddenClass = (index) => {
    setHiddenClasses((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Featching add/remove rekord to server
  const sendDataToServer = async (dataToSend) => {
    return fetch(`http://192.168.1.3:8080/api/sendData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server answer:", data);
        handleRefreshData();
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Refreshing the tables after adding/removing record
  const handleRefreshData = () => {
    setRefreshData((prevState) => !prevState);
  };

  // Support Add button
  const handleAddObject = async (table) => {
    if (table in inputValues) {
      const newObject = {
        action: "add",
        dataBase: dataBase,
        collection: table,
        newRekord: { ...inputValues[table] },
      };

      try {
        let answer = await sendDataToServer(newObject);
        console.log(answer.success);
        if (answer.success === false) {
          setSerwerAnswer(false);
        } else {
          setSerwerAnswer(true);
          setInputValues((prevState) => {
            const newState = { ...prevState };
            newState[table] = {};
            return newState;
          });
        }
      } catch (error) {
        console.error("Wystąpił błąd:", error);
      }
    }
  };

  //Support removing record
  const handleRemoveObject = (id, table) => {
    const removeObject = { action: "remove", dataBase: dataBase, collection: table, id: id };
    sendDataToServer(removeObject);
  };

  const renderTable = (table) => {
    return (
      <div className="tableContainer">
        <table key={table[0]}>
          {/* Printing table title */}
          <caption>{table[0]}</caption>
          <thead>
            <tr>
              {/* Printing table headers */}
              {table[1].map((e) => (
                <th key={e}>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.slice(2).map((row, index) => (
              <tr key={index}>
                {/* Printing the contents of the table */}
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {typeof cell === "object"
                      ? Object.entries(cell).map(([key, value]) => (
                          <div key={key}>
                            {key}: {value}
                          </div>
                        ))
                      : cell}
                    {cellIndex === row.length - 1 && cellIndex !== 0 && (
                      <button value={row[0]} onClick={() => handleRemoveObject(row[0], table[0])}>
                        X
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="addRekord">
          <div className="addRekordButton">
            <button onClick={() => toggleHiddenClass(table[0])}>Add new rekord</button>
          </div>
          <div className={hiddenClasses[table[0]] ? "visibleRekordInputs" : "hidden"}>
            {table[1].slice(1).map((e, index) => {
              let typ = "text";
              if (e === "grade") {
                typ = "number";
              }

              if (e === "__v" || e === "created") {
                return null; //Skipping adding input for __v wich is validator for mongoose
              } else if (index !== table[1].length - 2) {
                return (
                  <div key={e}>
                    <b htmlFor={e}>{e}: </b>
                    <input
                      type={typ}
                      placeholder={e}
                      key={e}
                      value={(inputValues[table[0]] && inputValues[table[0]][e]) || ""}
                      onChange={(ff) => handleInputChange(e, ff.target.value, table[0])}
                    />
                  </div>
                );
              }

              return null; // Printing null if user shouldn't adding that type of dat
            })}

            <div className="addButtonContainer">
              {/**/}
              <div id="failure" className={serwerAnswer ? "hidden" : "visibleRekordInputs"}>
                Something isn't right
              </div>

              <button onClick={() => handleAddObject(table[0])}> + </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function convertTo2DArray(data) {
    // Get unique keys from objects as table headers
    return data.map((e) => {
      const table = [];
      table.push(e.name);

      const headers = Array.from(new Set(e.objArr.flatMap((obj) => Object.keys(obj))));
      headers.push(""); //Adding delete button header

      // Adding keys as headers
      table.push(headers);

      // Adding the value for each object as the next row
      e.objArr.forEach((obj) => {
        const row = [];
        headers.forEach((header) => {
          // Checks if an object has a value for a given key
          if (header in obj) {
            if (obj[header] === null) {
              row.push("");
            } else {
              row.push(obj[header]);
            }
          } else {
            row.push("");
          }
        });

        table.push(row);
      });
      return renderTable(table);
    });
  }

  return (
    <div>
      <div className="primaryContainer">{convertTo2DArray(collections)}</div>
    </div>
  );
}
