import React from "react";

export default function NavBar(props) {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={props.Logo} className="icon" />
        </a>
        <h3 className="NavTile">Forecast 5 days</h3>
      </div>
      <h3>Project - V</h3>
    </nav>
  );
}
