import React, { useEffect, useState } from "react";

export default function Form({ setFilledForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [validationForm, setValidationForm] = useState("");

  const [nameValid, setNameValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [passwordValid2, setPasswordValid2] = useState("");

  const [nameClass, setNameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [passwordClass2, setPasswordClass2] = useState("");

  const validation = () => {
    if (name && name.length > 2) {
      setNameValid(true);
      setNameClass("trueValid");
    } else {
      setNameValid(false);
      setNameClass("failureValid");
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email && emailPattern.test(email)) {
      setEmailValid(true);
      setEmailClass("trueValid");
    } else {
      setEmailValid(false);
      setEmailClass("failureValid");
    }

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
  useEffect(() => {
    if (nameValid === true && emailValid === true && passwordValid2 === true) {
      setFilledForm({ name: name, email: email, password: password });
      setValidationForm(true);
      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");
    } else {
      setValidationForm(false);
      setFilledForm("");
    }
  }, [nameValid, emailValid, passwordValid2]);

  return (
    <div className="Container">
      <div className="primaryContainer">
        <div className="secondaryContainer">
          <label>Name: </label>
          <input
            type="text"
            value={name}
            className={nameClass}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="secondaryContainer">
          <label>E-mail: </label>
          <input
            type="text"
            value={email}
            className={emailClass}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="secondaryContainer">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            className={passwordClass}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="secondaryContainer">
          <label>Password: </label>
          <input
            type="password"
            value={password2}
            className={passwordClass2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>
        <div>
          <div className="signInButton">
            {validationForm && <p style={{ color: "rgb(0, 238, 20)", fontWeight: "bold" }}>Ok</p>}
            <button onClick={() => validation()}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
