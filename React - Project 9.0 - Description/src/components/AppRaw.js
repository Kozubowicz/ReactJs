import React, { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function AppDes() {
  const App = `
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import fetchData from "./components/featch";
import ListDB from "./components/ListDB";
import Table from "./components/Table";
import Footer from "./components/Footer";

export default function App() {
  const [dataBasesList, setSataBasesList] = useState({});
  const [dataBase, setDataBase] = useState();
  const [collection, setCollection] = useState({});
  const [refreshData, setRefreshData] = useState(false);

  //Downloading the list of databases at start-up application
  useEffect(() => {
    fetchData("databases")
      .then((data) => {
        setSataBasesList(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  //Set database name to download collections
  const downloadDataBase = (name) => {
    setDataBase(name);
  };

  //Downloading the collections from database
  useEffect(() => {
    if (dataBase) {
      fetchData("dataBase/$dataBase")
        .then((data) => {
          setCollection(data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [dataBase, refreshData]);

  return (
    <div className="App">
      <NavBar />

      {/*Printing buttons with databases names */}
      {dataBasesList.length > 0 ? (
        <ListDB bases={dataBasesList} dataBaseName={downloadDataBase} />
      ) : (
        <div className="loadContainer">Loading data....</div>
      )}

      {/*Printing a collection as a table */}
      {collection.length > 0 ? (
        <Table collections={collection} dataBase={dataBase} setRefreshData={setRefreshData} />
      ) : (
        <div className="loadContainer">Choose database to download data</div>
      )}

      <Footer />
    </div>
  );
}
    `;

  const featch = `
    export default async function fetchData(name) {
        try {
          console.log(name);
          const response = await fetch("http://192.168.1.3:8080/api/$name");
          const data = await response.json();
      
          return data;
        } catch (error) {
          console.error("Error during downloading data", error);
          throw error;
        }
      }
      
    `;
  const NavBar = `
    import React from "react";
    import Logo from "./../images/Logo.png";
    
    export default function NavBar() {
      return (
        <nav>
          <div className="NavLogo">
            <img src={Logo} className="icon" alt="Logo" />
            <h3 className="NavTile">Databases</h3>
          </div>
          <h3>Project IX</h3>
        </nav>
      );
    }
    
    `;
  const ListDb = `
    import React from "react";

    export default function ListDB({ bases, dataBaseName }) {
      const setDataBase = (value) => {
        dataBaseName(value);
      };
    
      return (
        <div className="dataBasesContainer">
          {bases.map((e) => (
            <button key={e} value={e} onClick={(event) => setDataBase(event.target.value)}>
              {e}
            </button>
          ))}
        </div>
      );
    }
    
    `;
  const Table = `
    import React, { useState } from "react";

    export default function Expenses({ collections, dataBase, setRefreshData }) {
      // Support input type="text"
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
        return fetch(http://192.168.1.3:8080/api/sendData", {
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
            // Jeśli otrzymasz odpowiedź od serwera, możesz manipulować nią tutaj
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
          <div className="tablesConteiner">{convertTo2DArray(collections)}</div>
        </div>
      );
    }
    
    `;
  const Footer = `
    import React from "react";

    export default function Footer() {
      return (
        <footer>
          <hr />
          <small>@2023</small>
        </footer>
      );
    }
    
    `;

  const [code, setCode] = useState();
  const codeHandler = (name) => {
    setCode(name);
  };

  return (
    <div className="primaryContainer">
      <div className="secondaryContainer">
        <div className="functionsContainer">
          <button onClick={() => codeHandler(App)}>App.js</button>
          <button onClick={() => codeHandler(featch)}>featch.js</button>
          <button onClick={() => codeHandler(NavBar)}>NavBar.js</button>
          <button onClick={() => codeHandler(ListDb)}>ListDb.js</button>
          <button onClick={() => codeHandler(Table)}>Table.js</button>
          <button onClick={() => codeHandler(Footer)}>Footer.js</button>
        </div>
      </div>

      <div className="secondaryContainer">
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
