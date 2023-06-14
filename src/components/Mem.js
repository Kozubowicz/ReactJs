import React from "react";

const img = [
  "https://i.imgflip.com/1g8my4.jpg",
  "https://i.imgflip.com/1ur9b0.jpg",
  "https://i.imgflip.com/261o3j.jpg",
  "https://i.imgflip.com/43a45p.png",
  "https://i.imgflip.com/24y43o.jpg",

  "https://i.imgflip.com/22bdq6.jpg",
  "https://i.imgflip.com/3lmzyx.jpg",
  "https://i.imgflip.com/3oevdk.jpg",
  "https://i.imgflip.com/9ehk.jpg",
  "https://i.imgflip.com/345v97.jpg",

  "https://i.imgflip.com/2fm6x.jpg",
  "https://i.imgflip.com/28j0te.jpg",
  "https://i.imgflip.com/1c1uej.jpg",
  "https://i.imgflip.com/m78d.jpg",
  "https://i.imgflip.com/1otk96.jpg",

  "https://i.imgflip.com/23ls.jpg",
  "https://i.imgflip.com/46e43q.png",
  "https://i.imgflip.com/1yxkcp.jpg",
  "https://i.imgflip.com/1tl71a.jpg",
  "https://i.imgflip.com/1ihzfe.jpg",

  "https://i.imgflip.com/1o00in.jpg",
  "https://i.imgflip.com/gk5el.jpg",
  "https://i.imgflip.com/1bij.jpg",
  "https://i.imgflip.com/1b42wl.jpg",
  "https://i.imgflip.com/26am.jpg",

  "https://i.imgflip.com/1h7in3.jpg",
  "https://i.imgflip.com/1wz1x.jpg",
  "https://i.imgflip.com/4acd7j.png",
  "https://i.imgflip.com/gtj5t.jpg",
  "https://i.imgflip.com/1e7ql7.jpg",
];

export default function Mem(props) {
  return (
    <div className="finalMem">
      <img id="memContener" src={img[props.x]}></img>
      <div id="topTextContener">{props.topValue}</div>
      <div id="bottomTextContener">{props.bottomValue}</div>
    </div>
  );
}
