import './App.css';
import { useState } from "react";

const api = {
  key: "ab09517c953d8e4ba98e9fa954c4e94d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    setError(null);
    setWeather(null);

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Background style based on weather
  const getBackground = () => {
    if (!weather) return {}; // No background if weather data is not available

    const weatherType = weather.weather[0].main.toLowerCase();

    if (weatherType.includes("clear")) return { backgroundImage: "url('https://example.com/sunny.jpg')" };
    if (weatherType.includes("cloud")) return { backgroundImage: "url('https://example.com/cloudy.jpg')" };
    if (weatherType.includes("rain")) return { backgroundImage: "url('https://example.com/rainy.jpg')" };
    if (weatherType.includes("snow")) return { backgroundImage: "url('https://example.com/snowy.jpg')" };
    return { backgroundColor: "lightblue" }; // Default
  };

  return (
    <div className="App" style={getBackground()}>
      <header className="App-header">
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && !error && (
          <div className="weather-info">
            <p>{weather.name}, {weather.sys?.country}</p>
            <p>{weather.main?.temp}°C</p>
            <div>
              <p>{weather.weather?.[0].main}</p>
              <p>({weather.weather?.[0].description})</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
