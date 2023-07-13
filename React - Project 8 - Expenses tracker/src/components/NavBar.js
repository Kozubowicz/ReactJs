import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" />
        </a>
        <h3 className="NavTile">Expenses tracker</h3>
      </div>
      <h3>Project VIII</h3>
    </nav>
  );
}
