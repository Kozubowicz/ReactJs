import React from "react";
import { useState } from "react";
import Mem from "./Mem";

//import Banner from "../images/banner.jpg";

export default function PrimaryHeader() {
  const [x, setX] = useState(0);

  const handleButtonClick = () => {
    const random = Math.floor(Math.random() * 30); // Losowanie liczby z zakresu 0-10
    setX(random);
  };

  const [topValue, setTopValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");

  const handleTopChange = (event) => {
    setTopValue(event.target.value);
  };

  const handleBottomChange = (event) => {
    setBottomValue(event.target.value);
  };

  return (
    <div className="controlPanel">
      <div className="PrimaryHeader">
        <div>
          Top line text:
          <br />
          <input
            id="topText"
            type="text"
            className="inputText"
            value={topValue}
            onChange={handleTopChange}
            placeholder="Top"
          />
        </div>
        <div>
          Bottom line text:
          <br />
          <input
            id="bottomText"
            type="text"
            className="inputText"
            value={bottomValue}
            onChange={handleBottomChange}
            placeholder="Bottom"
          />
        </div>
      </div>

      <div className="SecondaryHeader">
        <button id="randomImage" onClick={handleButtonClick}>
          Random Image
        </button>
      </div>
      <Mem x={x} topValue={topValue} bottomValue={bottomValue} />
    </div>
  );
}

/*


export default function PrimaryHeader() {
  const [topValue, setTopValue] = useState("");

  const topChange = (event) => {
    setTopValue(event.target.valuet);
  };

  const [bottomValue, setBottomValue] = useState("");

  const bottomChange = (event) => {
    setBottomValue(event.target.valueb);
  };

  return (
    <div className="PrimaryHeader">
      <div>
        Top line text:
        <br />
        <input
          id="topText"
          type="text"
          className="inputText"
          value={topValue}
          onChange={topChange}
        />
      </div>
      <div>
        Bottom line text:
        <br />
        <input
          id="bottomText"
          type="text"
          className="inputText"
          value={bottomValue}
          onChange={bottomChange}
        />
      </div>
    </div>
  );
}




*/
