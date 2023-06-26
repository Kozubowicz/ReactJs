import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <img src={Logo} className="icon" alt="Logo" />
        <h3 className="NavTile">School DB</h3>
      </div>
      <h3>Project X</h3>
    </nav>
  );
}
