import React, { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function AppDes() {
  const App = `
  import React, { useState, useEffect } from "react";
  import NavBar from "./components/NavBar";
  import Functions from "./components/Functions";
  import fetchData from "./components/fetch";
  import Table from "./components/Table";
  import StudentsList from "./components/StudentsList";
  import Exam from "./components/Exam";
  import StudentInfo from "./components/StudentInfo";
  import Login from "./components/LogIn";
  import Footer from "./components/Footer";
  import Form from "./components/Form";
  
  export default function App() {
    const [mode, setMode] = useState("");
    const [collection, setCollection] = useState({});
    const [refreshData, setRefreshData] = useState(false);
    const [teacherId, setTeacherId] = useState("");
    const [signUp, setSignUp] = useState(false);
  
    //Downloading the collections from database
    useEffect(() => {
      if (mode) {
        fetchData("school/" + mode)
          .then((data) => {
            setCollection(data);
          })
          .catch((error) => {
            console.error("Error", error);
          });
      }
    }, [mode, refreshData]);
  
    //Download user id from storage if exists
    useEffect(() => {
      const id = localStorage.getItem("teacherId");
      if (id && id != "undefined") {
        setTeacherId(id);
      }
    }, [setTeacherId]);
  
    //Save user id to storage
    useEffect(() => {
      localStorage.setItem("teacherId", teacherId);
    }, [teacherId]);
  
    //Set function
    const downloadMode = (name) => {
      setMode(name);
    };
  
    return (
      <div className="App">
        {/*Printing NavBar with butonn Sign in/ Sign out */}
        <NavBar
          setTeacherId={setTeacherId}
          teacherId={teacherId}
          setSignUp={setSignUp}
          signUp={signUp}
        />
        {/*Printing log in container if user isn't logged this mean there isn't id in storage*/}
        {!signUp && !teacherId && <Login setTeacherId={setTeacherId} />}
        {/*Printing log in container*/}
        {signUp && <Form setSignUp={setSignUp} signUp={signUp} />}
        {/*Printing buttons with app modes names */}
        {teacherId && <Functions mode={downloadMode} />}
        {/*Printing a collection as a table */}
  
        {teacherId && collection.length > 0 && mode === "Students_list" && (
          <StudentsList collections={collection} />
        )}
        {teacherId && collection.length > 0 && mode === "Exam_data" && (
          <Exam collections={collection} teacherId={teacherId} />
        )}
        {teacherId && collection.length > 0 && mode === "Student_Info" && (
          <StudentInfo collections={collection} />
        )}
        {teacherId && collection.length > 0 && mode === "List_all_data" && (
          <Table collections={collection} dataBase="school" setRefreshData={setRefreshData} />
        )}
  
        <Footer />
      </div>
    );
  }
  
    `;
  const Exam = `
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
        return fetch(http://192.168.1.3:8080/api/Exam, {
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
    
    `;
  const featch = `
// Function to download data from server in one of primary mode

export default async function fetchData(name) {
  try {
    const response = await fetch(http://192.168.1.3:8080/api/{name});
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during downloading data", error);
    throw error;
  }
}

    `;
  const Form = `
// Sign Up form

import React, { useEffect, useState } from "react";

export default function Form() {
  const [serwerAnswer, setSerwerAnswer] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [nameValid, setNameValid] = useState("");
  const [surnameValid, setSurnameValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [passwordValid2, setPasswordValid2] = useState("");

  const [nameClass, setNameClass] = useState("");
  const [surnameClass, setSurnameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [passwordClass2, setPasswordClass2] = useState("");

  /* Function to validate on client side data from form and marking them,
     after clicking Sign in button */
  const validation = () => {
    setSerwerAnswer("");
    if (name && name.length > 2) {
      setNameValid(true);
      setNameClass("trueValid");
    } else {
      setNameValid(false);
      setNameClass("failureValid");
    }
    if (surname && surname.length > 2) {
      setSurnameValid(true);
      setSurnameClass("trueValid");
    } else {
      setSurnameValid(false);
      setSurnameClass("failureValid");
    }

    // Pattern to validate email format
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email && emailPattern.test(email)) {
      setEmailValid(true);
      setEmailClass("trueValid");
    } else {
      setEmailValid(false);
      setEmailClass("failureValid");
    }

    // Pattern to validate password format
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{5,}$/;
    if (password && passwordPattern.test(password)) {
      setPasswordClass("trueValid");
    } else {
      setPasswordClass("failureValid");
    }

    if (password2 && passwordPattern.test(password2)) {
      if (password === password2) {
        setPasswordValid2(true);
        setPasswordClass2("trueValid");
      } else {
        setPasswordValid2(false);
        setPasswordClass("failureValid");
        setPasswordClass2("failureValid");
      }
    } else {
      setPasswordValid2(false);
      setPasswordClass2("failureValid");
    }
  };

  // Function to gather data to send after successful validation of all data from form
  useEffect(() => {
    if (
      nameValid === true &&
      surnameValid === true &&
      emailValid === true &&
      passwordValid2 === true
    ) {
      const filledForm = { name: name, surname: surname, email: email, password: password };
      submit(filledForm);
    }
  }, [nameValid, surnameValid, emailValid, passwordValid2]);

  // Function to cleaning form after successful answer from server
  useEffect(() => {
    if (serwerAnswer === true) {
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setPassword2("");

      setNameValid("");
      setSurnameValid("");
      setEmailValid("");
      setPasswordValid2("");

      setNameClass("");
      setSurnameClass("");
      setEmailClass("");
      setPasswordClass("");
      setPasswordClass2("");
    } else {
      setEmailValid(false);
    }
  }, [serwerAnswer]);

  // Service of sending and reciving answer from server
  const submit = async (form) => {
    try {
      let answer = await sendDataToServer(form);
      if (answer.success === false) {
        setSerwerAnswer(false);
      } else {
        setSerwerAnswer(true);
      }
      console.log(answer);
      return answer;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Sending data to server
  const sendDataToServer = async (dataToSend) => {
    return fetch(http://192.168.1.3:8080/api/SignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    // Printing form
    <div className="formContainer">
      <div className="primaryFormContainer">
        <div className="secondaryFormContainer">
          <label>Name: </label>
          <input
            type="text"
            value={name}
            className={nameClass}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="secondaryFormContainer">
          <label>Surname: </label>
          <input
            type="text"
            value={surname}
            className={surnameClass}
            onChange={(e) => setSurname(e.target.value)}
          ></input>
        </div>

        <div className="secondaryFormContainer">
          <label>E-mail: </label>
          <input
            type="text"
            value={email}
            className={emailClass}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="secondaryFormContainer">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            className={passwordClass}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="secondaryFormContainer">
          <label>Password: </label>
          <input
            type="password"
            value={password2}
            className={passwordClass2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>
        <div>
          {/* Printing answer if sending data to server was successful or failed */}
          <div className="signInButton">
            {serwerAnswer === true && (
              <p style={{ color: "rgb(0, 238, 20)", fontWeight: "bold" }}>Server Ok</p>
            )}
            {serwerAnswer === false && (
              <p style={{ color: "rgb(250, 0, 0)", fontWeight: "bold" }}>Server Failed</p>
            )}
            <button onClick={() => validation()}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
    
    `;
  const Functions = `
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
    
    `;
  const LogIn = `
  // Log in page

  import React, { useState } from "react";
  
  export default function Login({ setTeacherId }) {
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [serwerAnswer, setSerwerAnswer] = useState(true);
  
    // Getting email
    const handleEmail = (Email) => {
      setUserEmail(Email);
    };
    // Getting password
    const handlePassword = (Password) => {
      setUserPassword(Password);
    };
  
    // Sending Log in data and service answer
    const sendLogData = async () => {
      const logInData = { userEmail, userPassword };
  
      try {
        let answer = await sendDataToServer(logInData);
  
        if (answer.success === false) {
          setSerwerAnswer(false);
        } else {
          setSerwerAnswer(true);
          setUserPassword([]);
          setUserEmail([]);
          setTeacherId(answer.id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const sendDataToServer = async (dataToSend) => {
      return fetch(http://192.168.1.3:8080/api/LogIn, {
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
  
    return (
      // Printing Log In form
      <div className="formContainer">
        <div className="primaryFormContainer">
          <div className="secondaryFormContainer">
            User e-mail:
            <input type="text" onChange={(e) => handleEmail(e.target.value)}></input>
          </div>
          <div className="secondaryFormContainer">
            User Password:
            <input type="password" onChange={(e) => handlePassword(e.target.value)}></input>
          </div>
          <div className="logInButtonContainer">
            <div id="failure" className={serwerAnswer ? "hidden" : "visibleRekordInputs"}>
              Invalid log in data
            </div>
            <button onClick={() => sendLogData()}>Log In</button>
          </div>
        </div>
      </div>
    );
  }
        
    `;
  const NavBar = `
  // Printing NavBar

  import React from "react";
  import Logo from "./../images/Logo.png";
  
  export default function NavBar({ teacherId, setTeacherId, setSignUp, signUp }) {
    const handleSignOut = () => {
      setTeacherId();
      localStorage.removeItem("teacherId");
    };
    const handleSingnUp = () => {
      setSignUp(!signUp);
    };
  
    return (
      <nav>
        <div className="NavLogo">
          <img src={Logo} className="icon" alt="Logo" />
          <h3 className="NavTile">School DB</h3>
        </div>
        <div className="NavLogo">
          <h3>Project X</h3>
          {/* Printing Sign up or Sign Out button */}
          {!teacherId && <button onClick={() => handleSingnUp()}>Sign Up</button>}
          {teacherId && <button onClick={() => handleSignOut()}>Sign Out</button>}
        </div>
      </nav>
    );
  }
  
    
    `;
  const sortStudents = `
  // Function to sort alphabetically list of students

  export default function sortStudents(objArr) {
    // Creating an object to store divided collections
    const classes = {};
  
    // Iterating through the array of objects
    objArr.forEach((obj) => {
      const { class: objClass, ...rest } = obj;
  
      // Checking if the "class" attribute exists in the object
      if (objClass) {
        // Checking if a collection with the given "class" value already exists
        if (classes[objClass]) {
          classes[objClass].push(rest);
        } else {
          classes[objClass] = [rest];
        }
      }
    });
  
    // Sorting keys (values of "class") in alphabetical order
    const sortedKeys = Object.keys(classes).sort();
  
    // Sorting arrays in the classes object based on the "surname" attribute
    sortedKeys.forEach((key) => {
      classes[key].sort((a, b) => {
        const surnameA = a.surname.toLowerCase();
        const surnameB = b.surname.toLowerCase();
        if (surnameA < surnameB) return -1;
        if (surnameA > surnameB) return 1;
        return 0;
      });
    });
  
    // Getting attribute keys
    const attributeKeys = Object.keys(objArr[0]).filter((key) => key !== "class");
    return { classes, sortedKeys, attributeKeys };
  }
  
    
    `;
  const StudentInfo = `
  // Printing table with selected student grades

  import React, { useState } from "react";
  import sortStudents from "./sortStudents";
  import fetchData from "./fetch";
  
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
  
    
    `;
  const StudentsList = `
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
        
    `;
  const Table = `
  // Printing all collections as tables

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
      return fetch(http://192.168.1.3:8080/api/sendData, {
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
        
    `;
  const Footer = `  
//Footer for app

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
          <button onClick={() => codeHandler(Exam)}>Exam.js</button>
          <button onClick={() => codeHandler(featch)}>featch.js</button>
          <button onClick={() => codeHandler(Form)}>Form.js</button>
          <button onClick={() => codeHandler(Functions)}>Functions.js</button>
          <button onClick={() => codeHandler(LogIn)}>LogIn.js</button>
          <button onClick={() => codeHandler(NavBar)}>NavBar.js</button>
          <button onClick={() => codeHandler(sortStudents)}>sortStudents.js</button>
          <button onClick={() => codeHandler(StudentInfo)}>StudentInfo.js</button>
          <button onClick={() => codeHandler(StudentsList)}>StudentsList.js</button>
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
