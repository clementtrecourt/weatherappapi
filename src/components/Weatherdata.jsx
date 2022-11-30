import React, { useEffect, useState } from "react";
import axios from "axios";
const Weatherdata = () => {
  const [data, setData] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState();
  const appid = `4a2eb6a77180c23b010756afa4199966`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${appid}&q=${cityName}&units=metric`
        )
        .then((response) => {
          setWeatherIcon(
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          );
          setData(response.data);
        });
    } catch (e) {}
  };

  return (
    <div className="flex items-center flex-col">
      <div className="rounded mt-20 bg-[#ffffff55] w-[600px] h-[400px p-12">
        <h1 className="font-bold text-2xl text-center text-white">
          Weather App
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center flex-col">
          <input
            autoFocus
            className="text-[#3b3b3b] text-center focus:outline-0 rounded my-2"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            placeholder="Enter city name"
          />
          <button className="text-white rounded bg-blue-500 p-1 m-2 hover:bg-blue-400">
            Search
          </button>
        </form>
        {data ? (
          <div className="flex items-center flex-col">
            <h1 className="text-white">{data.name}</h1>
            <img src={weatherIcon} alt="" />
            <h2 className="text-white">{Math.ceil(data.main.temp)}°C</h2>
            <p className="text-white">
              {data.weather[0].description.charAt(0).toUpperCase() +
                data.weather[0].description.slice(1)}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weatherdata;
