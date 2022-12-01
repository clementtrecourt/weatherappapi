import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const Weatherdata = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);
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
      <div className="rounded mt-20 bg-[#ffffff55] w-[600px] h-[400px p-12 flex flex-col ">
        <Link to="/dashboard">
          <div className="flex justify-center items-center bg-[#ffffff27] rounded hover:bg-[#ffffff3a]">
            <FontAwesomeIcon icon={faUser} className="text-white" />
            <p className="ml-2 font-semibold text-lg text-white">My Account</p>
          </div>
        </Link>

        <h1 className="font-bold text-[36px] text-center text-white mt-6">
          Weather App
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center flex-col">
          <input
            autoFocus
            className="p-[10px] mb-[10px] mt-3 text-black rounded"
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            placeholder="Enter city name"
          />
          <button className="bg-[#4285f4] py-[10px] px-[10px] rounded text-[18px] mb-[10px] hover:bg-[#4286f4e1]">
            Search
          </button>
        </form>
        {/* <button className="dashboard__btn" onClick={logout}>
          Logout
        </button> */}
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
