import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" />
        </a>
        <h3 className="NavTile">School Db</h3>
      </div>
      <h3>Project XI</h3>
    </nav>
  );
}
