import React, { useEffect, useState } from "react";
import SecondaryHeader from "./SecondaryHeader";

export default function PrimaryHeader() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.log("Błąd podczas pobierania danych:", error);
      }
    };

    const setUrl = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=1783226d35b4f6a4d4631e7bba3d563b&units=metric`;
          fetchData(url);
        });
      }
    };

    setUrl();
  }, []);

  if (!weather) {
    return <div className="loading">Ładowanie danych...</div>;
  }

  let sunriseStamp = new Date(weather.city.sunrise * 1000);
  let sunsetStamp = new Date(weather.city.sunset * 1000);
  let sunrise = sunriseStamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let sunset = sunsetStamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      {console.log(weather)}
      <div className="primaryData">
        <div className="city">{weather.city.name}</div>
        <div className="sun">
          <a>Sunrise: {sunrise}</a>
          <a>Sunset: {sunset}</a>
        </div>
      </div>
      <hr />
      <div className="weatherWindows">
        {weather.list.map((element, key) => {
          return (
            <SecondaryHeader
              key={key}
              icon={element.weather[0].icon}
              des={element.weather[0].main}
              temp={element.main.temp}
              time={element.dt}
            />
          );
        })}
      </div>
    </div>
  );
}
