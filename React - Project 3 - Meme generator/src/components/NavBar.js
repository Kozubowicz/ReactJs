import React from "react";

export default function NavBar(props) {
  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={props.Logo} className="icon" />
        </a>
        <h3 className="NavTile">Meme generator</h3>
      </div>
      <h3>Project III</h3>
    </nav>
  );
}
