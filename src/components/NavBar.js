import React from "react";

export default function NavBar(props) {
  return (
    <nav>
      <div className="NavLogo">
        <img src={props.Logo} className="icon" />
        <h3 className="NavTile">Meme generator</h3>
      </div>
      <h3>Project III</h3>
    </nav>
  );
}
