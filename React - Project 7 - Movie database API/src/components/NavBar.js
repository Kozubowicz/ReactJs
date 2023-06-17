import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <img src={Logo} className="icon" alt="Logo" />
        <h3 className="NavTile">Movie search</h3>
      </div>
      <h3>Project VII</h3>
    </nav>
  );
}
