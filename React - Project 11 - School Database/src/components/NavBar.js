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
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" />{" "}
        </a>
        <h3 className="NavTile">School DB</h3>
      </div>
      <div className="NavLogo">
        <h3>Project XI</h3>
        {/* Printing Sign up or Sign Out button */}
        {!teacherId && <button onClick={() => handleSingnUp()}>Sign Up</button>}
        {teacherId && <button onClick={() => handleSignOut()}>Sign Out</button>}
      </div>
    </nav>
  );
}
