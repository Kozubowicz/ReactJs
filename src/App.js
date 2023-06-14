import React from "react";
import NavBar from "./components/NavBar";
import PrimaryHeader from "./components/PrimaryHeader";
import GalleryWindow from "./components/GalleryWindow";

import Miles from "./images/Miles.jpg";
import Gwen from "./images/Gwen.jpg";
import Ben from "./images/Ben.jpg";
import Miguel from "./images/Miguel.jpg";
import Peter_B from "./images/Peter_B.jpg";
import Jessica from "./images/Jessica.jpg";

const array = [
  { pic: Miles, rating: "5.4", name: "Miles", uni: "1610" },
  { pic: Gwen, rating: "5.1", name: "Gwen", uni: "65" },
  { pic: Ben, rating: "2.5", name: "Ben", uni: "616" },
  { pic: Miguel, rating: "4.5", name: "Miguel", uni: "928" },
  { pic: Peter_B, rating: "6", name: "Peter B", uni: "616B" },
  { pic: Jessica, rating: "3.9", name: "Jessica", uni: "404" },
];

export default function App() {
  return (
    <div>
      <NavBar />

      <PrimaryHeader />
      <div className="GalleryDiv">
        <div className="Galllery">
          {array.map((element) => {
            return (
              <GalleryWindow
                pic={element.pic}
                rating={element.rating}
                name={element.name}
                uni={element.uni}
              />
            );
          })}
        </div>
      </div>

      <footer>
        <hr />
        <small>@ All Sony rights</small>
      </footer>
    </div>
  );
}
