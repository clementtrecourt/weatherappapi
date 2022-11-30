import { useState } from "react";

import Weatherdata from "./components/Weatherdata";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Weatherdata />
    </div>
  );
}

export default App;
