import React from "react";

import Logo from "../images/spiderLogo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <img src={Logo} className="icon" alt="icon" />
        <h3 className="NavTile">Spider-Man</h3>
      </div>
      <h3>Spider-Mans small gallery</h3>
    </nav>
  );
}
