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
    return fetch(`http://192.168.1.3:8080/api/SignUp`, {
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
