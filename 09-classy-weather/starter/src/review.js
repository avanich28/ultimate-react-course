import { useState, useEffect } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

export default function App() {
  const [state, setState] = useState({
    isLoading: false,
    displayLocation: "",
    weather: {},
  });
  const [query, setQuery] = useState(function () {
    const storedValue = localStorage.getItem("query");
    return storedValue ? JSON.parse(storedValue) : "";
  });

  function handleChangeLocation(e) {
    setQuery(e.target.value);
  }

  useEffect(
    function () {
      localStorage.setItem("query", JSON.stringify(query));
    },
    [query]
  );

  useEffect(
    function () {
      async function fetchWeather() {
        if (query.length < 2)
          return setState((obj) => ({ ...obj, weather: {} }));

        try {
          setState((obj) => ({ ...obj, isLoading: true }));
          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
          );
          const geoData = await geoRes.json();
          console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);

          setState((obj) => ({
            ...obj,
            displayLocation: `${name} ${convertToFlag(country_code)}`,
          }));

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );

          const weatherData = await weatherRes.json();
          console.log(weatherData);

          setState((obj) => ({ ...obj, weather: weatherData.daily }));
        } catch (err) {
          console.error(err);
        } finally {
          setState((obj) => ({ ...obj, isLoading: false }));
        }
      }
      fetchWeather();
    },
    [query]
  );

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={query} onChangeLocation={handleChangeLocation} />

      {state.isLoading && <p className="loader">Loading...</p>}
      {state.weather.weathercode && (
        <Weather weather={state.weather} location={state.displayLocation} />
      )}
    </div>
  );
}

function Input({ location, onChangeLocation }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for location..."
        value={location}
        onChange={(e) => onChangeLocation(e)}
      />
    </div>
  );
}

function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
