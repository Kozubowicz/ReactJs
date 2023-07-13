import React from "react";
import Logo from "./../images/Logo.png";

import Twitter from "./../images/Twitter.png";

export default function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <a href="https://twitter.com/NRNonline">
          <img src={Logo} className="icon" alt="Logo" />
        </a>
        <h3 className="NavTile">Restaurant survey</h3>
      </div>
      <h3>Project XIII</h3>
      <a href="https://twitter.com/NRNonline">
        <img src={Twitter} className="icon" alt="Logo" />
      </a>
    </nav>
  );
}
