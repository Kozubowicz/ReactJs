import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Logo from "../src/images/logo.png";

function Page() {
  return (
    <div>
      <NavBar />
      <div className="BackgroundImage">
        <Content />

        <Footer />
      </div>
    </div>
  );
}
function NavBar() {
  return (
    <nav>
      <div className="NavLogo">
        <img src={Logo} className="icon" />
        <h3 className="NavTile">ReactFacts</h3>
      </div>
      <h3>React.Js - Project I</h3>
    </nav>
  );
}
function Content() {
  return (
    <div className="Content">
      <h1>Fun facts abou React.Js: </h1>
      <ul>
        <li>Was first relased in 2013</li>
        <li>Was orginaly created by Jordan Walke</li>
        <li>Has well over 100K stars on Github</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile ones</li>
      </ul>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <hr />
      <small>@2023 Raw development. All rights reserved.</small>
    </footer>
  );
}

ReactDOM.render(<Page />, document.getElementById("root"));
