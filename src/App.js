import { useState } from "react";
import "./App.css";
import nature from "./assets/nature.mp4";
import snow from "./assets/snow.mp4";
import warm from "./assets/warm.mp4";

const api = {
  key: "11a8d649b40cad61d92e152ed565433e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const inputHandler = (e) => {
    setQuery(e.target.value);
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      const request = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      if(!request.ok){
        setError('Unknown Place!')
      }
      const data = await request.json();
      setData(data);
    }
  };

  return (
    <>
           {!data.main && (
        <video className="videoTag" autoPlay loop muted>
          <source src={nature} type="video/mp4" />
        </video>
      )}

      {data.main && data.main.temp < 5 && (
        <video className="videoTag" autoPlay loop muted>
          <source src={snow} type="video/mp4" />
        </video>
      )}

      {data.main && data.main.temp > 5 && data.main.temp < 15 && (
        <video className="videoTag" autoPlay loop muted>
          <source src={nature} type="video/mp4" />
        </video>
      )}

      {data.main && data.main.temp > 15 && (
        <video className="videoTag" autoPlay loop muted>
          <source src={warm} type="video/mp4" />
        </video>
      )}

      <div className="container">
        <div className="appContainer">
          <h2>
            Insert the Location and Press Enter, <br />
            to Find Out the Temperature
          </h2>
          <input
            type="text"
            placeholder="Search..."
            onKeyDown={search}
            onChange={inputHandler}
            value={query}
          />
           {error && !data.main && <p>{error}</p>}
          {data.main ? (
            <div>
              <h1>
                Temprature in {data.name} is {Math.round(data.main.temp) + "°C"}
              </h1>
              <p>
                Wether description: {data.weather[0].description}
                <br />
                Wind speed: {data.wind.speed}
                <br />
                Pressure: {data.main.pressure}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default App;
