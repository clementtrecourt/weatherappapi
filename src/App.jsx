import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Weatherdata from "./components/Weatherdata";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Weatherdata />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
