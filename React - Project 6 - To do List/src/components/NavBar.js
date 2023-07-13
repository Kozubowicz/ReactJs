import React from "react";
import Logo from "./../images/Logo.png";

export default function NavBar(props) {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={Logo} className="icon" alt="Logo" />
        </a>
        <h3 className="NavTile">To do list</h3>
      </div>
      <h3>Project VI</h3>
    </nav>
  );
}
