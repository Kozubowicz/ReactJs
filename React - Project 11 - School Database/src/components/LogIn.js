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
    return fetch(`http://192.168.1.3:8080/api/LogIn`, {
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
