import React from "react";

import Banner from "../images/banner.jpg";

export default function PrimaryHeader() {
  return (
    <div className="Content">
      <img src={Banner} className="banner" alt="banner"></img>
      <h2>Spider-Mans gallery: </h2>
    </div>
  );
}
