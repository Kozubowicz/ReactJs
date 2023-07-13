import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" />
        </a>
        <h3 className="NavTile">Registration Form</h3>
      </div>
      <div className="NavLogo">
        <h3>Project X</h3>
      </div>
    </nav>
  );
}
