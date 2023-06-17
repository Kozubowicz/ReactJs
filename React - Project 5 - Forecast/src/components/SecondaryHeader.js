import React from "react";

export default function SecondaryHeader(props) {
  let timeStamp = new Date(props.time * 1000);
  let data = timeStamp.toLocaleDateString();
  let hour = timeStamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let iconUrl = `https://openweathermap.org/img/wn/${props.icon}@2x.png`;
  return (
    <div className="SecondaryHeader">
      <div className="topWindow">
        <img src={iconUrl} />
        <h2> {Math.round(props.temp)} °C</h2>{" "}
      </div>
      <div className="bottomWindow">
        <a className="Des">{props.des}</a>
        <a className="Hour">{hour}</a>
        <a className="Data">{data}</a>
      </div>
    </div>
  );
}
