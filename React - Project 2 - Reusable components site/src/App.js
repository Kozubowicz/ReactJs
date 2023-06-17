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
  { key: 1, pic: Miles, rating: "5.4", name: "Miles", uni: "1610" },
  { key: 2, pic: Gwen, rating: "5.1", name: "Gwen", uni: "65" },
  { key: 3, pic: Ben, rating: "2.5", name: "Ben", uni: "616" },
  { key: 4, pic: Miguel, rating: "4.5", name: "Miguel", uni: "928" },
  { key: 5, pic: Peter_B, rating: "6", name: "Peter B", uni: "616B" },
  { key: 6, pic: Jessica, rating: "3.9", name: "Jessica", uni: "404" },
];

export default function App() {
  return (
    <div>
      <NavBar />

      <PrimaryHeader />
      <div className="GalleryDiv">
        <div className="Galllery">
          {array.map((element, key) => {
            return (
              <GalleryWindow
                key={key}
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
