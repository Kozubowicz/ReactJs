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
        {!teacherId && <button onClick={() => handleSingnUp()}>Sign Up</button>}
        {teacherId && <button onClick={() => handleSignOut()}>Sign out</button>}
      </div>
    </nav>
  );
}
