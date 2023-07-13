import React, { useState } from "react";
import Logo from "./../images/logo.png";

export default function NavBar() {
  const [isLight, setIsLight] = useState(true);

  const handleModeChange = () => {
    setIsLight(!isLight);
    if (isLight) {
      document.body.classList.add("light-mode");
      document.querySelector("nav").classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
      document.querySelector("nav").classList.remove("light-mode");
    }
  };

  return (
    <nav>
      <div className="NavLogo">
        <a href="/">
          <img src={Logo} className="icon" />
        </a>
        <h3 className="NavTile">ReactFacts</h3>
      </div>
      <h3>React.Js - Project IV</h3>

      <label className={`switch ${isLight ? "light" : "dark"}`}>
        <input type="checkbox" checked={isLight} onChange={handleModeChange} />
        <span className="slider">
          <span className="dot"></span>
        </span>
      </label>
    </nav>
  );
}
