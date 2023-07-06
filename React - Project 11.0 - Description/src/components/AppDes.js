import React from "react";
import one from "./../images/1.png";
import two from "./../images/2.png";
import tree from "./../images/3.png";
import four from "./../images/4.png";
import five from "./../images/5.png";

import six from "./../images/6.png";
import seven from "./../images/7.png";
import eight from "./../images/8.png";
import nine from "./../images/9.png";
import ten from "./../images/10.png";
import eleven from "./../images/11.png";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AppDes() {
  const code1 = `
  // App.js

  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id != "undefined") {
      setTeacherId(id);
    }
  }, [setTeacherId]);

  ...

  ...

  {/*Printing NavBar with butonn Sign in/ Sign out */}
      <NavBar
        setTeacherId={setTeacherId}
        teacherId={teacherId}
        setSignUp={setSignUp}
        signUp={signUp}
      />
      {/*Printing log in container if user isn't logged this mean there isn't id in storage*/}
      {!signUp && !teacherId && <Login setTeacherId={setTeacherId} />}


  // NabBar.js

  ...

    {!teacherId && <button onClick={() => handleSingnUp()}>Sign Up</button>}

  ...
  `;
  const code2 = `
  //LogIn.js
  
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

  ...

  ...

    <div id="failure" className={serwerAnswer ? "hidden" : "visibleRekordInputs"}>
      Invalid log in data
    </div>

  ...

  `;
  const code3 = `
  // Form.js
  ...

  // Pattern to validate email format
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (email && emailPattern.test(email)) {
    setEmailValid(true);
    setEmailClass("trueValid");
  } else {
    setEmailValid(false);
    setEmailClass("failureValid");
  }

  ...

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

  ...

  {/* Printing answer if sending data to server was successful or failed */}
  <div className="signInButton">
    {serwerAnswer === true && (
      <p style={{ color: "rgb(0, 238, 20)", fontWeight: "bold" }}>Server Ok</p>
    )}
    {serwerAnswer === false && (
      <p style={{ color: "rgb(250, 0, 0)", fontWeight: "bold" }}>Server Failed</p>
    )}
    <button onClick={() => validation()}>Sign In</button>

  ...
  `;
  const code4 = ` 
  // StudentsList.js

  ...

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

    ...
  `;
  const code5 = `
  // Exam.js
  ...

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

  ...
  `;
  const code6 = `
  //StudentInfo.js

  ...

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

  ...
  
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

  ...
  `;

  return (
    <div className="primaryContainer">
      <div className="secondaryContainer">
        On start the app is looking for user id in storage, if it is not found then appear login
        form and Sign up button on NavBar
        <div className="photoContainer">
          <img className="photo" src={one} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code1}
        </SyntaxHighlighter>
      </div>

      <div className="secondaryContainer">
        After clicking login button data from form are send to server, if there is a math then
        appear bar with function
        <div className="photoContainer">
          <img className="photo" src={seven} alt="start-up page" />
        </div>
        if there is no match then appear message invalid data
        <div className="photoContainer">
          <img className="photo" src={two} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code2}
        </SyntaxHighlighter>
      </div>

      <div className="secondaryContainer">
        After clicking Sign Up button then appear register form, after agin clicki appear Log in
        form
        <div className="photoContainer">
          <img className="photo" src={tree} alt="start-up page" />
        </div>
        After clicking Sign In button data from form are validated and marked if they are correct or
        not on user side
        <div className="photoContainer">
          <img className="photo" src={four} alt="start-up page" />
        </div>
        If data are validated successfully on user side they are send to server where are validated
        again with moongose and checked if email is already registered, if something is wrong then
        apear message Failed.
        <div className="photoContainer">
          <img className="photo" src={five} alt="start-up page" />
        </div>
        If everything is fine form is cleaned and appear message Ok
        <div className="photoContainer">
          <img className="photo" src={six} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code3}
        </SyntaxHighlighter>
      </div>

      <div className="secondaryContainer">
        After clicking the List of students button,appear tables with alphabetically ordered lists
        of students by class
        <div className="photoContainer">
          <img className="photo" src={eight} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code4}
        </SyntaxHighlighter>
      </div>

      <div className="secondaryContainer">
        After clicking Exam button appear select with list of classes next to field to put in
        subject and below table with students names a field to put in grade
        <div className="photoContainer">
          <img className="photo" src={nine} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code5}
        </SyntaxHighlighter>
      </div>

      <div className="secondaryContainer">
        After clicking Student Info button appear select to choose class and select to choose
        student after that appeartablewith student grades list
        <div className="photoContainer">
          <img className="photo" src={ten} alt="start-up page" />
        </div>
        <SyntaxHighlighter language="javascript" style={dracula}>
          {code6}
        </SyntaxHighlighter>
      </div>

      <div className="secondaryContainer">
        After clicking List all data button appear all collections in database as tables, with
        functionalty to add and remove record
        <div className="photoContainer">
          <img className="photo" src={eleven} alt="start-up page" />
        </div>
      </div>
    </div>
  );
}
