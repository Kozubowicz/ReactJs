import React from "react";

export default function NavBar(props) {
  return (
    <nav>
      <div className="NavLogo">
        <img src={props.Logo} className="icon" />
        <h3 className="NavTile">Logo</h3>
      </div>
      <h3>Site-name</h3>
    </nav>
  );
}
