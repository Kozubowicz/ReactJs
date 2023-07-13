import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" />
        </a>
        <h3 className="NavTile">Databases</h3>
      </div>
      <h3>Project IX</h3>
    </nav>
  );
}
